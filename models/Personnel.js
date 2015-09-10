var mongoose = require('mongoose');

var PersonnelSchema = new mongoose.Schema({
        firstName: String, 
        middleName: String, 
        lastName: String, 
        birthdate: String, 
        gender: String, 
        maritalStatus: String, 
        occupation: String, 
        contactNumber: String
        });

mongoose.model('Personnel', PersonnelSchema);