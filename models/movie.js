const Joi = require('joi');
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true, 
    minlength: 5,
    maxlength: 255
  },
  genre: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  sumofRatings: {
    type: Number,
    default:0
  },
  totalRatings: {
    type: Number,
    default:0
  },
  avgRating: {
    type: Number,
    default:0
  }
})

const Movie = mongoose.model('Movies', movieSchema);

function validateMovie(movie) {
  const schema = {
    title: Joi.string().min(5).max(50).required(),
    genre: Joi.string().min(3).required()
  };

  return Joi.validate(movie, schema);
}

exports.Movie = Movie; 
exports.movieSchema = movieSchema;
exports.validate = validateMovie;