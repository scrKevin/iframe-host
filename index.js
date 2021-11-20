var fs = require('fs');
var http = require('http');
var https = require('https');

var privateKey  = fs.readFileSync(__dirname + '/cert/privkey.pem', 'utf8');
var certificate = fs.readFileSync(__dirname + '/cert/fullchain.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate};

var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public')); 


app.get('/twitch', function(req, res) {
  res.render('pages/twitch/index');
});

app.get('/stopwatch', function(req, res) {
  res.render('pages/stopwatch/index');
});

var httpServer = http.createServer(app);
httpServer.listen(3131);
var httpsServer = https.createServer(credentials, app);
httpsServer.listen(443);