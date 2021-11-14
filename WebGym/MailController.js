var express = require('express');
var mailer = require('nodemailer');
var router = express.Router();
module.exports = router;

router.get('/', async (req, res) => {
	res.render('mail/index', {layout: 'dashboard'});
});

router.post('/post', async (req, res) => {
	var transporter =  mailer.createTransport({ // config mail server
        service: 'gmail',
        auth: {
            user: 'minhhy7777777@gmail.com',
            pass: 'hotlaanh19'
        }
    });
    try {
    	var opt = {
    		from: 'minhhy7777777@gmail.com',
    		to: req.body['eml'],
    		subject: req.body['subject'],
    		text: 'Hello ' + req.body['name'] + '\n' + req.body['message']
    	};
    	var ret = await transporter.sendMail(opt);
    	console.log(ret);
    	res.redirect('home/index', {msg: 'Success'});
    } catch(ex) {
    	console.log(ex);
    	res.redirect('home/index', {msg: 'Error'});
    }
});