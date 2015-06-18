'use strict';

// require the npm modules I will be using
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// require mongo, setup the db and collections, using mongojs module
var mongo = require('mongo');
var mongojs = require('mongojs');
var db = mongojs('redb', ['mls', 'users', 'mlsNumber']);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

// set up the express routes
// get all of the listings
app.get('/mls', function(req, res) {
  db.mls.find(function(err, docs) {
    res.json(docs);
  })
});

// get the record for a specific ID to populate fields to update listing
app.get('/editmls/:id', function(req, res) {
  var id = req.params.id;
  db.mls.findOne({_id: mongojs.ObjectId(id)},function(err, docs) {
    res.json(docs);
  })
});

// add a new listing
app.post('/addmls', function(req, res) {
  db.mls.insert(req.body, function(err, docs) {
    res.json(docs);
  });
});

// update a listing
app.put('/updatemls/:id', function(req, res) {
  var id = req.params.id;
  delete req.body._id;

  db.mls.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: req.body,
    new: true
    }, function(err, docs) {
      res.json(docs);
  });
});

// delete a listing
app.delete('/deletemls/:id', function(req, res) {
  var id = req.params.id;
  db.mls.remove({_id: mongojs.ObjectId(id)}, function(err, docs) {
    res.json(docs);
  });
});

// get the MLS number to use
app.get('/getmls', function(req, res) {
  db.mlsNumber.find(function(err, docs) {
    // create the collection if it does not exist
    if (docs.length < 1) {
      var mlsNumber = '10234';
      db.mlsNumber.save( {mlsNum: mlsNumber});
      res.json(mlsNumber);
    }
    else {
    // otherwise, grab the number and increase by one
      docs[0].mlsNum++;
      db.mlsNumber.save( {mlsNum: docs[0].mlsNum, _id: docs[0]._id } );
      res.json(docs[0].mlsNum);
    }
  })
});

// search on all possible fields, if user did not enter any input in a field
// skip it. Would refactor this if I had more time probably.
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

// start the server and listen for requests
app.listen(process.env.PORT || 3000, function() {
  console.log('server started');
});
