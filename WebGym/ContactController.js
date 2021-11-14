var express = require('express');
var router = express.Router();
var contact = require('./models/Contact');
module.exports = router;

router.get('/', async (req, res) => {
	var a = await contact.getContacts();
	res.render('contact/index', {layout: 'dashboard', arr: a});
});

router.post('/add', async(req, res) => {
	var o = req.body;
	var ret = await contact.add(o);
	console.log(ret);
	res.redirect('/contact');
});

router.get('/edit/:id', async (req, res) => {
	var o = await contact.getContactById(req.params['id']);
	res.render('contact/edit', {layout: 'dashboard', obj: o});
});

router.post('/edit/:id', async (req, res) => {
	var o = req.body;
	var obj = {name: o['name'], icon: o['icon']};
	var ret = await contact.edit(o['id'], obj);
	console.log(ret);
	res.redirect('/contact');
});