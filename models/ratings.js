const Joi = require('joi');
const mongoose = require('mongoose');
const {userSchema} = require('./user');
const {movieSchema} = require('./movie');
const Rating = mongoose.model('Rating', new mongoose.Schema({
    user: { 
        type: String,  
        required: true
      },
        
    movie: { 
        type: String,  
        required: true
      },
    movieTitle: { 
        type: String,  
        required: true
      },
    date: { 
        type: Date, 
        required: true,
        default: Date.now
    },
    Ratings: { 
        type: Number,
        min: 0
    },
    comments: { 
        type: String,
        trim: true, 
        minlength: 5,
        maxlength: 255 

    }
}));

function validateRating(rating) {
  const schema = {
    // userId: Joi.objectId().required(),
    // movieId: Joi.objectId().required()
    rating: Joi.number().required(),
    comment: Joi.string().min(5).max(50).required()
  };

  return Joi.validate(rating, schema);
}

exports.Rating = Rating; 
exports.validate = validateRating;