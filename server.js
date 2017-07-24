var express = require('express')
var bodyParser = require('body-parser');
var path = require('path')
var port = 3000

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', express.static(path.join(__dirname, '/client')))
app.use(express.static(path.join(__dirname, '/node_modules/angular')));

app.listen(port, () => {
  console.log('App is listening to port ' + port);
})

module.exports = app;