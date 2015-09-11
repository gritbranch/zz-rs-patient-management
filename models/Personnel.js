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

PersonnelSchema.methods.update = function (cb) {
        this.firstName = 'Ryan';
        this.save(cb);
}

mongoose.model('Personnel', PersonnelSchema);