var express = require('express');
var router = express.Router();
var about = require('./models/About');
var sharp = require('sharp');
module.exports = router;

router.get('/', async (req, res) => {
	var a = await about.getAbouts();
	res.render('about/index', {layout: 'dashboard', arr: a});
});

router.post('/add', async(req, res) => {
	var o = req.body;
	var ret = await about.add(o);
	console.log(ret);
	res.redirect('/about');
});

async function upload(req, o) {
	if (req.files) {
		var f = req.files['f'];
		var url = 'static/upload/';
		// fit lại để hình nằm chính giữa và resize
		var opt = {width: 420, height: 550, fit: sharp.fit.cover}; 
		// resize
		var r = await sharp(f.data).resize(opt).toFile(url + f.name);
		// console.log(r);
		o['imageUrl'] = f.name;
	}
}

router.get('/edit/:id', async (req, res) => {
	var o = await about.getAboutById(req.params['id']);
	res.render('about/edit', {layout: 'dashboard', obj: o});
});

router.post('/edit/:id', async (req, res) => {
	var o = req.body;
	// if (req.files) {
	// 	var f = req.files['f'];
	// 	o['imageUrl'] = f['name'];
	// 	f.mv('static/upload/' + f['name']);
	// }
	var obj = {title: o['title'], description_s: o['description_s'], description_b: o['description_b']};
	await upload(req, obj);
	var ret = await about.edit(o['id'], obj);
	console.log(ret);
	res.redirect('/about');
});
