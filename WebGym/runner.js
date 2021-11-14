var express = require('express');
var handlebars = require('express-handlebars');
var bodyParser = require('body-parser');

var fileupload = require('express-fileupload');
var category = require('./CategoryController');
var banner = require('./BannerController');
var about = require('./AboutController');
var service = require('./ServiceController');
var client = require('./ClientController');
var trainer = require('./TrainerController');
var gallery = require('./GalleryController');
var contact = require('./ContactController');
var gcontact = require('./GContactController');
var post = require('./PostController');
var popular = require('./PopularController');
var mail = require('./MailController');
var stock = require('./StockController');

var home = require('./HomeController');


var app = express();

app.use(bodyParser.urlencoded({extended: true})); //thêm để xử lý post
app.use(fileupload());

app.use(express.static('static')); // để hiểu dc css
app.engine('html', handlebars({extname: '.html'})); //đọc file html
app.set('view engine', 'html');

app.listen(5000, () => {
	console.log('Listening port 5000');
});

app.use('/', home);
app.use('/category', category);
app.use('/banner', banner);
app.use('/about', about);
app.use('/service', service);
app.use('/client', client);
app.use('/trainer', trainer);
app.use('/gallery', gallery);
app.use('/contact', contact);
app.use('/gcontact', gcontact);
app.use('/post', post);
app.use('/popular', popular);
app.use('/mail', mail);
app.use('/stock', stock);