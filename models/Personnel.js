var mongoose = require('mongoose');

var PersonnelSchema = new mongoose.Schema({
        firstName: String, 
        middleName: String, 
        lastName: String, 
        address: String,
        birthdate: String, 
        gender: String, 
        maritalStatus: String, 
        occupation: String, 
        contactNumber: String,
        referredBy: String,
        records: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Record' }]
        });

mongoose.model('Personnel', PersonnelSchema);