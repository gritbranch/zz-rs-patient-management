var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Personnel = mongoose.model('Personnel');

/*
var bodyParser = require('body-parser'); //parses information from POST
var methodOverride = require('method-override'); //used to manipulate POST

router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
      }
}))
*/

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

//lists all person from db
router.get('/list', function(req, res, next) {
    Personnel.find(function(err, data) {
        if (err) {
            return next(err);
        }

        res.json(data);
    });
});

//lists person by filter
//TO DO

//adds person to DB
router.post('/add', function(req, res, next) {
    var personnel = new Personnel(req.body);

    personnel.save(function(err, person) {
        if (err) {
            return next(err);
        }


        res.json(person);
    });
});

//returns selected id
router.param('pid', function(req, res, next, id) {
    var query = Personnel.findById(id);

    query.exec(function(err, data) {
        if (err) {
            return next(err);
        }
        if (!data) {
            return next(new Error('can\'t find person'));
        }

        req.data = data;
        return next();
    });
});

//function "pid" will be executed first and will return an Id
router.get('/view/:pid', function(req, res) {
    res.json(req.data);
});

router.put('/view/:pid/update', function(req, res, next) {
  var person = req.data;

/*
  personx.firstName = "Ryan";
  personx.middleName = "Palacios";
  personx.lastName = "Salvador";
  personx.birthdate = "09/08/1983";
  personx.gender = "M";
  personx.maritalStatus = "Married";
  personx.occupation = "Software Engr.";
  personx.contactNumber = "09175138559";
*/  
  person.firstName = req.body.firstName;
  person.middleName = req.body.middleName;
  person.lastName = req.body.lastName;
  person.birthdate = req.body.birthdate;
  person.gender = req.body.gender;
  person.maritalStatus = req.body.maritalStatus;
  person.occupation = req.body.occupation;
  person.contactNumber = req.body.contactNumber;

  person.save(function(err) {
    if (err) {
      return next(err);
    } else {
      res.json(person);
    }
  });
});


router.delete('/view/:pid/delete', function(req, res, next) {
  var person = req.data;

  person.remove(function(err) {
    if (err) {
      return next(err);
    } else {
      res.json(person);
    }
  });
});

module.exports = router;