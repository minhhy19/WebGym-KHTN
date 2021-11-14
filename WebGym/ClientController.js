var express = require('express');
var router = express.Router();
var client = require('./models/Client');
var sharp = require('sharp');
module.exports = router;

router.get('/', async (req, res) => {
	var a = await client.getClients();
	res.render('client/index', {layout: 'dashboard', arr: a});
});

router.get('/add', (req, res) => {
	res.render('client/add', {layout: 'dashboard'});
});

router.post('/add', async (req, res) => {
	var o = req.body;
	if (req.files) {
		var f = req.files['f'];
		f.mv('static/upload/' + f.name);
		o['imageUrl'] = f.name;
	}
	var ret = await client.add(o);
	console.log(ret);
	res.redirect('/client');
});

async function upload(req, o) {
	if (req.files) {
		var f = req.files['f'];
		var url = 'static/upload/';
		// fit lại để hình nằm chính giữa và resize
		var opt = {width: 90, height: 90, fit: sharp.fit.cover}; 
		// resize
		var r = await sharp(f.data).resize(opt).toFile(url + f.name);
		// console.log(r);
		o['imageUrl'] = f.name;
	}
}

router.get('/edit/:id', async (req, res) => {
	var o = await client.getClientById(req.params['id']);
	res.render('client/edit', {layout: 'dashboard', obj: o});
});

router.post('/edit/:id', async (req, res) => {
	var id = req.params['id'];
	var o = req.body;
	// if (req.files) {
	// 	var f = req.files['f'];
	// 	f.mv('static/upload/' + f.name);
	// 	o['imageUrl'] = f.name;
	// }
	await upload(req, o)
	var ret = await client.edit(id, o);
	console.log(ret);
	res.redirect('/client');
});