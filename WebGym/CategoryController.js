var express = require('express');
var router = express.Router();
var category = require('./models/Category');
module.exports = router;

router.get('/', async (req, res) => {
	var a = await category.getCategories();
	res.render('category/index', {layout: 'dashboard', arr: a});
});

router.get('/edit/:id', async (req, res) => {
	var o = await category.getCategoryById(req.params['id']);
	res.render('category/edit', {layout: 'dashboard', obj: o});
});

router.post('/edit/:id', async (req, res) => {
	var o = req.body;
	var obj = {name: o['name']};
	var ret = await category.edit(o['id'], obj);
	console.log(ret);
	res.redirect('/category');
});

router.post('/add', async(req, res) => {
	var o = {
		name: req.body['name']
	};
	var ret = await category.add(o);
	console.log(ret);
	res.redirect('/category');
});