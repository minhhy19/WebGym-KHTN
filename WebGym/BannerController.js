var express = require('express');
var banner = require('./models/Banner');
var router = express.Router();
// var sharp = require('sharp');
module.exports = router;

router.get('/', async(req, res) => {
	var a = await banner.getBanners();
	res.render('banner/index', {layout: 'dashboard', arr: a});
});

router.post('/add', async(req, res) => {
	var o = req.body;
	var ret = await banner.add(o);
	console.log(ret);
	res.redirect('/banner');
});

router.get('/edit/:id', async(req, res) => {
	var o = await banner.getBannerById(req.params['id']);
	res.render('banner/edit', {layout: 'dashboard', obj: o});
});

router.post('/edit/:id', async(req, res) => {
	var id = req.params['id'];
	var o = req.body;
	var ret = await banner.edit(id, o);
	console.log(ret);
	res.redirect('/banner');
});