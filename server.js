// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var url = require('url');
const moment = require('moment');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
  console.log("hello");
});

app.get("/api/timestamp/:numbers", function (req, res) {
  var obj = url.parse(req.url, true);
  var path = obj.pathname;
  var query = obj.query.iso;
  var date = new Date(query);
  if (req.params.numbers == ' '){
    res.send(moment());
  } else if (isNaN(req.params.numbers)) { // is YYYY/M/D
      res.json({unix: unix(req.params.numbers), utc: moment(req.params.numbers).format('llll')});
    } else { //is unix
      res.json({unix: req.params.numbers, utc: normal(req.params.numbers)});
    }
  console.log("working");

});

//2 funcions para parsear cada una

function unix (date) {
  return moment(date, 'YYYY/M/D').valueOf();
}

function normal (date){
  return moment.unix(date/1000).format('llll');
}

app.get("/:name", function(req, res) {
  res.send("the name is: " + req.params.name);
  console.log(req.params.name);
});



// listen for requests :)
var listener = app.listen(3001, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
