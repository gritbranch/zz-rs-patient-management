var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Personnel = mongoose.model('Personnel')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/list', function(req, res, next) {
  Personnel.find(function(err, data){
    if(err){ return next(err); }
      
    res.json(data);
  });
});

router.post('/add', function(req, res, next) {
  var personnel = new Personnel(req.body);

  personnel.save(function(err, person){
    if(err){ return next(err); }

      
    res.json(person);
  });
});

/*
router.param('post', function(req, res, next, id) {
  var query = Post.findById(id);

  query.exec(function (err, post){
    if (err) { return next(err); }
    if (!post) { return next(new Error('can\'t find post')); }

    req.post = post;
    return next();
  });
});
*/

router.param('pid', function(req, res, next, id) {
  var query = Personnel.findById(id);

  query.exec(function (err, data){
    if (err) { return next(err); }
    if (!data) { return next(new Error('can\'t find person')); }

    req.data = data;
    return next();
  });
});

//function "pid" will be executed first and will return an Id
router.get('/view/:pid', function(req, res) {
    res.json(req.data);
});

module.exports = router;
