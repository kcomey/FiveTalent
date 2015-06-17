'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongo = require('mongo');
var mongojs = require('mongojs');
var db = mongojs('redb', ['mls', 'users']);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/mls', function(req, res) {
  db.mls.find(function(err, docs) {
    console.log(docs);
    res.json(docs);
  })
});

app.post('/addmls', function(req, res) {
  console.log('server line 21 ' + req.body.street1);
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  db.mls.insert(req.body, function(err, docs) {
    res.json(docs);
  });
});

app.put('/updatemls/:id', function(req, res) {
  var id = req.params.id;
  console.log(req.body.author);
  db.mls.findAndModify({query: {_id: mongojs.ObjectId(id)},
    update: {$set:{note: req.body.note, author: req.body.author}},
    new: true}, function(err, docs) {
      res.json(docs)
    });
});

app.delete('/deletemls/:id', function(req, res) {
  var id = req.params.id;
  console.log(id);
  db.mls.remove({_id: mongojs.ObjectId(id)}, function(err, docs) {
    res.json(docs);
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log('server started');
});