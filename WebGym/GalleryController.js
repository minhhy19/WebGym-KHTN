var express = require('express');
var router = express.Router();
var gallery = require('./models/Gallery');
var sharp = require('sharp');
module.exports = router;

router.get('/', async (req, res) => {
	var a = await gallery.getImages();
	res.render('gallery/index', {layout: 'dashboard', arr: a});
});

router.get('/add', (req, res) => {
	res.render('gallery/add', {layout: 'dashboard'});
});

router.post('/add', async (req, res) => {
	var o = req.body;
	if (req.files) {
		var f = req.files['f'];
		f.mv('static/upload/' + f.name);
		o['imageUrl'] = f.name;
	}
	var ret = await gallery.add(o);
	console.log(ret);
	res.redirect('/gallery');
});

async function uploadHigh(req, o) {
	if (req.files) {
		var f = req.files['f'];
		var url = 'static/upload/';
		// fit lại để hình nằm chính giữa và resize
		var opt = {width: 400, height: 530, fit: sharp.fit.cover}; 
		// resize
		var r = await sharp(f.data).resize(opt).toFile(url + f.name);
		// console.log(r);
		o['imageUrl'] = f.name;
	}
}

async function uploadShort(req, o) {
	if (req.files) {
		var f = req.files['f'];
		var url = 'static/upload/';
		// fit lại để hình nằm chính giữa và resize
		var opt = {width: 400, height: 266, fit: sharp.fit.cover}; 
		// resize
		var r = await sharp(f.data).resize(opt).toFile(url + f.name);
		// console.log(r);
		o['imageUrl'] = f.name;
	}
}

router.get('/edit/:id', async (req, res) => {
	var o = await gallery.getImageById(req.params['id']);
	res.render('gallery/edit', {layout: 'dashboard', obj: o});
});

router.post('/edit/:id', async (req, res) => {
	var id = req.params['id'];
	var o = req.body;
	// if (req.files) {
	// 	var f = req.files['f'];
	// 	f.mv('static/upload/' + f.name);
	// 	o['imageUrl'] = f.name;
	// }
	o['kind'] == 'high' ? await uploadHigh(req, o) : await uploadShort(req, o);
	var ret = await gallery.edit(id, o);
	console.log(ret);
	res.redirect('/gallery');
});