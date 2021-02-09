const {Rating, validate} = require('../models/ratings'); 
const {Movie} = require('../models/movie'); 
const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();




router.post('/:id', auth,async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message); 

  const movie = await Movie.findById(req.params.id);
//   console.log(movie)
  if (!movie) return res.status(400).send('Invalid movie.');
  const movietitle = await Movie.findById(req.params.id).select({title:1})
  // console.log(movietitle.title)

  // a user should only be able to rate the movie once
  const userCheck = await Rating.find({movie:req.params.id}).select({user:1})
  if (userCheck.length !=0  && req.user._id === userCheck[0].user) {
      return res.status(400).send('cannot rate again,please go back choose another movie')
  }

  let rating = new Rating({ 
    user : req.user._id,
    movie: req.params.id,
    movieTitle: movietitle.title,
    Ratings : parseInt(req.body.rating),
    comments: req.body.comment
  });
  rating = await rating.save();

//   const usersCount = await Rating.find({movie:req.params.id}).count();
//   console.log(usersCount);
  movie.totalRatings++;
  movie.sumofRatings += parseInt(req.body.rating) ;
  movie.avgRating = Math.floor(movie.sumofRatings/movie.totalRatings);
  movie.save();



//   res.redirect('/');
  res.send(rating);
});



router.get('/list', async (req, res) => {
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)
  
  const startIndex = (page-1)*limit;
  const endIndex = page*limit;
  await Rating.find().skip(startIndex).limit(endIndex).sort({Ratings:1}).select({movieTitle:1,Ratings:1,comments:1,user:1}).then(content=> {
    res.render('PaginateMovies',{content});
  })
});
module.exports = router; 