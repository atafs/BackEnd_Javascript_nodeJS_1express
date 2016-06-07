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

/* SERVER: port */
app.set('port', process.env.PORT || 3000);

/* ALLOW access to the public folder for the images */
app.use(express.static(__dirname + '/public'));

/* ROUTES FOR THE API ************************************************/
// root: point to the home file
app.get('/', function(req, res) {
	res.render('home');
});

// /about: point to the home file
app.get('/about', function(req, res){
  // Allow for the test specified in tests-about.js
  res.render('about');
});

/* LISTENER *********************************************************/
app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate');
});
