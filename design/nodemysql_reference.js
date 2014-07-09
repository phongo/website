/* Referencing Jasper's Workshop */

/**
 * Module dependencies.
 */
var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

// mongo
var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/comp20';
var mongo = require('mongodb');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser());


app.get('/', function (req, res){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  mongo.Db.connect(mongoUri, function (err, db){
    db.collection("scores", function (er, collection){
      collection.find({}).sort("score").toArray(function(e, saved){
        saved = saved.reverse();
        var output = "<table style=\"width:500px; font-size:18px;\" border=\"3\"><th>Name</th><th>Score</th><th>Timestamp</th>";
for(n in saved) {
          output = output + "<tr><td>" + saved[n].username + "</td><td>" +
                   saved[n].score + "</td><td>" + saved[n].created_at +
                   "</td></tr>";
        }
        res.send(output);
      });
    });
  });
});

app.get('/scores.json', function (req, res){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  mongo.Db.connect(mongoUri, function (err, db){
    db.collection("scores", function (er, collection){
      var username = req.query.username;
      if (username == null) {
        res.send("[]");
        return;
      }
      collection.find({"username": username}).sort("score").toArray(function(e, saved){
        saved = saved.reverse();
        res.send(saved);
      });
    });
  });
});

app.post('/submit.json', function (req, res){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  mongo.Db.connect(mongoUri, function (err, db){
    db.collection("scores", function (er, collection){
      var score = parseInt(req.body.score);
      var name = req.body.username;
      var grid = req.body.grid;
      var days = ["Sun ", "Mon ", "Tue ", "Wed ", "Thu ", "Fri ", "Sat "];
      var months = ["Jan ", "Feb ", "Mar ", "Apr ", "May ", "Jun ", "Jul ",
                    "Aug ", "Sep ", "Oct ", "Nov ", "Dec "]; 
      var day = new Date();
      var dayString = days[day.getUTCDay()] + months[day.getUTCMonth()] +
     day.getUTCDate() + " " + day.getUTCFullYear() + " " +
                      day.getUTCHours() + ":" + day.getUTCMinutes() + ":" +
                      day.getUTCSeconds() + " GMT+0000 (UTC)";
      if (score != null && name != null && grid != null) {
        collection.insert({"username": name, "score": score, "grid": grid,
                           "created_at": dayString}, function (err, saved){
          res.send(saved);
        });
      }
    });
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});