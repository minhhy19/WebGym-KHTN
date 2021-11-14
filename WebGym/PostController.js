var express = require('express');
var router = express.Router();
var post = require('./models/Post');
var sharp = require('sharp');
module.exports = router;

router.get('/', async (req, res) => {
	var a = await post.getPosts();
	res.render('post/index', {layout: 'dashboard', arr: a});
});

router.get('/add', (req, res) => {
	res.render('post/add', {layout: 'dashboard'});
});

router.post('/add', async (req, res) => {
	var o = req.body;
	if (req.files) {
		var f = req.files['f'];
		f.mv('static/upload/' + f.name);
		o['imageUrl'] = f.name;
	}
	var ret = await post.add(o);
	console.log(ret);
	res.redirect('/post');
});

async function upload(req, o) {
	if (req.files) {
		var f = req.files['f'];
		var url = 'static/upload/';
		// fit lại để hình nằm chính giữa và resize
		var opt = {width: 80, height: 80, fit: sharp.fit.cover}; 
		// resize
		var r = await sharp(f.data).resize(opt).toFile(url + f.name);
		// console.log(r);
		o['imageUrl'] = f.name;
	}
}

router.get('/edit/:id', async (req, res) => {
	var o = await post.getPostById(req.params['id']);
	res.render('post/edit', {layout: 'dashboard', obj: o});
});

router.post('/edit/:id', async (req, res) => {
	var id = req.params['id'];
	var o = req.body;
	// if (req.files) {
	// 	var f = req.files['f'];
	// 	f.mv('static/upload/' + f.name);
	// 	o['imageUrl'] = f.name;
	// }
	await upload(req, o);
	var ret = await post.edit(id, o);
	console.log(ret);
	res.redirect('/post');
});