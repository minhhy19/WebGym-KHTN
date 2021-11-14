var express = require('express');
var contact = require('./models/Contact');
var gcontact = require('./models/GContact');
var router = express.Router();
module.exports = router;

router.get('/', async (req, res) => {
	var c = await contact.getContacts();
	var a = await gcontact.getGContacts();
	res.render('gcontact/index', {layout: 'dashboard', crr: c, arr: a});
});

router.post('/add', async(req, res) => {
	var ret = await gcontact.add(req.body);
	console.log(ret);
	res.redirect('/gcontact');
});

router.get('/edit/:id', async (req, res) => {
	var c = await contact.getContacts();
	var o = await gcontact.getGContactById(req.params['id']);
	res.render('gcontact/edit', {layout: 'dashboard', obj: o, crr: c});
});

router.post('/edit/:id', async (req, res) => {
	var o = req.body;
	var obj = {cid: o['cid'], group: o['group']};
	var ret = await gcontact.edit(o['id'], obj);
	console.log(ret);
	res.redirect('/gcontact');
});