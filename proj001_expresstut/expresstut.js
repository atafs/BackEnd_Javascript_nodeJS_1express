/* IMPORT MODULE */
var express = require('express');
var app = express();

/* SERVER: port */
app.set('port', process.env.PORT || 3000);

/* API root */
app.get('/', function(req, res) {
	res.send('Express Works all RIGHT');
});

/* LISTENER */
app.listen(app.get('port'), function() {
	console.log('Express started press Ctrl-C to terminate');
});
