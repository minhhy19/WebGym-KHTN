var express = require('express');
var router = express.Router();
var service = require('./models/Service');
module.exports = router;

router.get('/', async (req, res) => {
	var a = await service.getServices();
	res.render('service/index', {layout: 'dashboard', arr: a});
});

router.post('/add', async(req, res) => {
	var o = req.body;
	var ret = await service.add(o);
	console.log(ret);
	res.redirect('/service');
});

router.get('/edit/:id', async (req, res) => {
	var o = await service.getServiceById(req.params['id']);
	res.render('service/edit', {layout: 'dashboard', obj: o});
});

router.post('/edit/:id', async (req, res) => {
	var o = req.body;
	var obj = {title: o['title'], description: o['description'], icon: o['icon']};
	var ret = await service.edit(o['id'], obj);
	console.log(ret);
	res.redirect('/service');
});

router.post('/checked', async(req, res) => {
	var o = req.body;
	o['isright'] = o['isright'] == 'true' ? true : false;
	var ret = await service.edit(o['vid'], o);
	res.json(ret);
});