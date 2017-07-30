var express = require('express')
var bodyParser = require('body-parser');
var path = require('path');
var util = require('./utilities.js')

var port = 3000

var app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', express.static(path.join(__dirname, '/client')))
app.use(express.static(path.join(__dirname, '/node_modules/angular')));

app.all('/wiki', function(req, res) {
	let html = req.body.html;
	let link = util.getFirstValidLink(html)
	let response = util.formatResponse(link)
	res.send(response);
	
});

app.listen(port, () => {
  console.log('App is listening to port ' + port);
})

module.exports = app;