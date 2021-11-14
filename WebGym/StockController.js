var express = require('express');
var csv = require('csv-parser');
var fs = require('fs');
var stock = require('./models/Stock');
var router = express.Router();
module.exports = router;

router.get('/import', async (req, res) => {
	var arr = [];
	fs.createReadStream('static/data/PLNT.csv')
	.pipe(csv()).on('data', (row) => {
		// console.log(row);
		arr.push(row);
	}).on('end', async () => {
		var ret = await stock.addMany(arr);
		console.log(ret);
		// console.log('CSV file successfully processed');
		res.end('OK');
	});
});

router.get('/', async (req, res) => {
	var a = await stock.getStocks();
	// console.log(a);
	res.render('stock/index', {arr: a});
});

router.get('/chart', (req, res) => {
	res.render('stock/chart');
});

router.post('/chart', async (req, res) => {
	var a = await stock.getStocks();
	// console.log(a);
	res.json(a);
});