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
    res.json(docs);
  })
});

app.get('/editmls/:id', function(req, res) {
  var id = req.params.id;
  db.mls.findOne({_id: mongojs.ObjectId(id)},function(err, docs) {
    res.json(docs);
  })
});

app.post('/search', function(req, res) {
  var searchString = [];

  if (req.body.mlsNum) {
    searchString.push({ mlsNum: req.body.mlsNum });
  }
  if (req.body.dateListed) {
    searchString.push({ dateListed: req.body.dateListed });
  }
  if (req.body.city) {
    searchString.push({ city: req.body.city });
  }
  if (req.body.state) {
    searchString.push({ state: req.body.state });
  }
  if (req.body.zipcode) {
    searchString.push({ zipcode: req.body.zipcode });
  }
  if (req.body.bedrooms) {
    searchString.push({ bedrooms: req.body.bedrooms });
  }
  if (req.body.bathrooms) {
    searchString.push({ bathrooms: req.body.bathrooms });
  }
  if (req.body.squareFeet) {
    searchString.push({ squareFeet: req.body.squareFeet });
  }

  db.mls.find({ $and: searchString },
    function(err, docs){
      res.json(docs);
  })
});

app.post('/addmls', function(req, res) {
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  db.mls.insert(req.body, function(err, docs) {
    res.json(docs);
  });
});

app.put('/updatemls/:id', function(req, res) {
  var id = req.params.id;
  db.mls.findAndModify({query: {_id: mongojs.ObjectId(id)},
    update: {$set:{note: req.body.note, author: req.body.author}},
    new: true}, function(err, docs) {
      res.json(docs)
    });
});

app.delete('/deletemls/:id', function(req, res) {
  var id = req.params.id;
  db.mls.remove({_id: mongojs.ObjectId(id)}, function(err, docs) {
    res.json(docs);
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log('server started');
});


   // { bedrooms: req.body.bedrooms },
    //{ bathrooms: req.body.bathrooms },
    //{ squareFeet: req.body.squareFeet}
    //{ dateListed: req.body.dateListed },
    //{ city: req.body.city },
    //{ state: req.body.state },
