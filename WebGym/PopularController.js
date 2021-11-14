var express = require('express');
var csv = require('csv-parser');
var fs = require('fs');
var popular = require('./models/Popular');
var router = express.Router();
module.exports = router;

router.get('/import', async (req, res) => {
	var arr = [];
	fs.createReadStream('static/data/geoMap.csv')
	.pipe(csv({
		skipLines: 2
	})).on('headers', (headers) => {
    	// console.log(`First header: ${headers[0]}`)
    	headers[0] = 'Country';
    	headers[1] = 'Popularity';
 	}).on('data', (row) => {
		row.Popularity = row.Popularity == '' ? 0 : parseInt(row.Popularity);
		// console.log(row);
		arr.push(row);
		// console.log(arr);
	}).on('end', async () => {
		var ret = await popular.addMany(arr);
		console.log(ret);
		// console.log('CSV file successfully processed');
		res.end('OK');
	});
});

router.get('/', async (req, res) => {
	var a = await popular.getPopulars();
	// console.log(a);
	res.render('popular/index', {arr: a});
});

router.get('/ajax', async (req, res) => {
	res.render('popular/ajax');
});

router.post('/ajax', async (req, res) => {
	var a = await popular.getPopulars();
	// console.log(a);
	res.json(a);
});