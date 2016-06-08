/* ENTRY POINT for the app */
var express = require('express');
var app = express();

/* SECURITY: BLOCK our header from containing info about our server */
app.disable('x-powered-by');

/* IMPORT */
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

/* DEFINE ENGINE for handlebars */
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

/* MORE IMPORTS HERE */
// body-parser
app.use(require('body-parser').urlencoded({extended: true}));
// formidable
var formidable = require('formidable');
// cookie-parser
var credentials = require('./credentials.js');
app.use(require('cookie-parser')(credentials.cookieSecret));

/* SERVER: port */
app.set('port', process.env.PORT || 3000);

/* ALLOW access to the public folder for the images */
app.use(express.static(__dirname + '/public'));

/* ROUTES FOR THE API ************************************************/
// root: point to the home file
app.get('/', function(req, res) {
	res.render('home');
});

/* MIDDLEWARE receive a request, response and a next */
app.use(function(req, res, next){
  console.log('Looking for URL : ' + req.url);
	//CONTINUE looking for our routes
  next();
});

// THROW an error
app.get('/junk', function(req, res, next){
  console.log('Tried to access /junk');
  throw new Error('/junk does\'t exist');
});

// CATCH an error
app.use(function(err, req, res, next){
  console.log('Error : ' + err.message);
  next();
});

// /about: point to the home file
app.get('/about', function(req, res){
  // Allow for the test specified in tests-about.js
  res.render('about');
});

// contact view with security measures
app.get('/contact', function(req, res){
	// CSRF tokens are generated in cookie and form data and
	// then they are verified when the user posts
	res.render('contact', { csrf: 'CSRF token here' });
});

// thankyou view
app.get('/thankyou', function(req, res){
  res.render('thankyou');
});

// process view
app.post('/process', function(req, res){
	//PRINT TO SCREEN CONSOLE
  console.log('Form : ' + req.query.form);
  console.log('CSRF token : ' + req.body._csrf);
  console.log('Email : ' + req.body.email);
  console.log('Question : ' + req.body.ques);
	//SEND TO thankyou page
  res.redirect(303, '/thankyou');
});

// file-upload view
app.get('/file-upload', function(req, res){
  var now = new Date();
  res.render('file-upload',{
    year: now.getFullYear(),
    month: now.getMonth() });
});

//file-upload view new version with the add of year and date to the url
app.post('/file-upload/:year/:month', function(req, res){
    // Parse a file that was uploaded
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, file){
      if(err)
        return res.redirect(303, '/error');
      console.log('Received File');

      // Output file information
      console.log(file);
      res.redirect( 303, '/thankyou');
  });
});

/* MIDDLEWARE for the 404 and 500 errros */
// Custom 404 Page
app.use(function(req, res) {
  // Define the content type
  res.type('text/html');
  // The default status is 200
  res.status(404);
  // Point at the 404.handlebars view
  res.render('404');
});

// Custom 500 Page
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  // Point at the 500.handlebars view
  res.render('500');
});

/* LISTENER *********************************************************/
app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate');
});
