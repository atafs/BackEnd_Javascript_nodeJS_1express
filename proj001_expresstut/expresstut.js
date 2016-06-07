/* VARIABLE */
var express = require('express');
var app = express();

/* SERVER */
app.set('port', process.env.PORT || 3000);

/* PRINT */
app.get('/', function(req, res) {
	res.send('Express Works');
});

/* LISTENNER */
app.listen(app.get('port'), function() {
	console.log('Express started press Ctrl-C to terminate');
});

