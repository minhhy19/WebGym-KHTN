var express = require('express');
var mailer = require('nodemailer');
var category = require('./models/Category');
var banner = require('./models/Banner');
var about = require('./models/About');
var service = require('./models/Service');
var client = require('./models/Client');
var trainer = require('./models/Trainer');
var gallery = require('./models/Gallery');
var contact = require('./models/Contact');
var gcontact = require('./models/GContact');
var post = require('./models/Post');


var router = express.Router();
module.exports = router;

function toJson(a, col) {
	var json = {};
	for(var i in a) { // thêm group và lấy category làm key
		var k = a[i][col];
		if (json[k] == undefined) {
			json[k] = [];
		}
		json[k].push(a[i]);
	}
	return json;
}

function setChildren(a, json, col) {
	for(var i in a) {
		var k = a[i]['_id'];
		if (json[k]) {
			a[i][col] = json[k];
		}
	}
}

function groupNum(a, num) {
	var grr = {}; 
	var k = 0;
	for(var i in a) {
		k = parseInt(i / num);
		if (grr[k] == undefined) {
			grr[k] = [];
		} 
		grr[k].push(a[i]);
	}
	return grr;
}

async function loadData() {
	
}

router.post('/post', async (req, res) => {
	var transporter =  mailer.createTransport({ // config mail server
        service: 'gmail',
        auth: {
            user: 'minhhy7777777@gmail.com',
            pass: 'hotlaanh19'
        }
    });

	var c = await category.getCategories();

	var b = await banner.getBanners();

	var a = await about.getAbouts();

	var s = await service.getServices();

	var gc = await gcontact.getGContacts();
	var json = toJson(gc, 'cid');

	var co = await contact.getContacts();
	setChildren(co, json, 'gro');
	for (var i in co) {
		if (co[i].name == 'email') {
			co[i]['isEmail'] = true; 
		} else {
			co[i]['isEmail'] = false; 
		}
	}
	// console.log(co);

	var cli = await client.getClients();
	var json = groupNum(cli, 2);
	// var json = {}; 
	// var k = 0;
	// for(var i in cli) {
	// 	k = parseInt(i / 2);
	// 	if (json[k] == undefined) {
	// 		json[k] = [];
	// 	} 
	// 	json[k].push(cli[i]);
	// }
	// console.log(json);

	var t = await trainer.getTrainers();

	var g = await gallery.getImages();
	var group = toJson(g, 'group');
	// console.log(group);

	var p = await post.getPosts();
	var jsonP = groupNum(p, 3);

    try {
    	var opt = {
    		from: 'minhhy7777777@gmail.com',
    		to: req.body['eml'],
    		subject: req.body['subject'],
    		text: 'Hello ' + req.body['name'] + '\n' + req.body['message']
    	};
    	var ret = await transporter.sendMail(opt);
    	console.log(ret);
    	res.render('home/index', {msg: 'Success', crr: c, brr: b, arr: a, srr: s, clirr: json, trr: t, grr: group, corr: co, prr: jsonP});
    } catch(ex) {
    	console.log(ex);
    	res.render('home/index', {msg: 'Error', crr: c, brr: b, arr: a, srr: s, clirr: json, trr: t, grr: group, corr: co, prr: jsonP});
    }
});

router.get('/', async (req, res) => {
	var c = await category.getCategories();

	var b = await banner.getBanners();

	var a = await about.getAbouts();

	var s = await service.getServices();

	var gc = await gcontact.getGContacts();
	var json = toJson(gc, 'cid');

	var co = await contact.getContacts();
	setChildren(co, json, 'gro');
	for (var i in co) {
		if (co[i].name == 'email') {
			co[i]['isEmail'] = true; 
		} else {
			co[i]['isEmail'] = false; 
		}
	}
	// console.log(co);

	var cli = await client.getClients();
	var json = groupNum(cli, 2);
	// var json = {}; 
	// var k = 0;
	// for(var i in cli) {
	// 	k = parseInt(i / 2);
	// 	if (json[k] == undefined) {
	// 		json[k] = [];
	// 	} 
	// 	json[k].push(cli[i]);
	// }
	// console.log(json);

	var t = await trainer.getTrainers();

	var g = await gallery.getImages();
	var group = toJson(g, 'group');
	// console.log(group);

	var p = await post.getPosts();
	var jsonP = groupNum(p, 3);

	res.render('home/index', {crr: c, brr: b, arr: a, srr: s, clirr: json, trr: t, grr: group, corr: co, prr: jsonP});
}); 