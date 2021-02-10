const {Movie, validate} = require('../models/movie'); 
const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();



// router.get('/list', async (req, res) => {
//   const page = parseInt(req.query.page)
//   const limit = parseInt(req.query.limit)
  
//   const startIndex = (page-1)*limit;
//   const endIndex = page*limit;
//   await Movie.find().skip(startIndex).limit(endIndex).sort({avgRating:1}).select({title:1,totalRatings:1,avgRating:1}).then(content=> {
//     res.render('PaginateMovies',{content});
//   })
// });
router.get('/', auth,async (req, res) => {
  const movies = await Movie.find().sort('title').then(movie => {
    res.render('movies-list', { movie: movie});
})
.catch(err => {
console.log(err);
});
});

router.post('/',auth, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let movie = new Movie({ 
    title: req.body.title,
    genre: req.body.genre,
  });
  movie = await movie.save();
  res.redirect('/');
});


router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) return res.status(404).send('The movie with the given ID was not found.');
  res.render('ratings-page',{movie:movie})
});




module.exports = router; 