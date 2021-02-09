const mongoose = require('mongoose');
const joi = require('joi');


const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength: 3
    },
    email : {
        type : String,
        required: true,
        unique : true
    },
    password : {
        type : String,
        minlength : 8,
        maxlength : 1024,
        required : true
    },
    admin: {
        type: String,
        default: true
    }
});

const User = mongoose.model('User',userSchema);

function validateUser(user) {
    const schema = {
        name : joi.string().required().min(3),
        email : joi.string().required().email(),
        password : joi.string().required().min(8).max(25)
    };

    return joi.validate(user,schema);
    
}


exports.User = User;
exports.validateUser = validateUser;