const mongoose = require('mongoose');
// const Joi = require('joi');
// Joi.objectId=require('joi-objectid')(Joi);
const config = require('config');
const movies = require('./routes/movies');
const ratings = require('./routes/ratings');
const users = require('./routes/user');
const home = require('./routes/home');
const newuser = require('./routes/new-user');
const newmovie = require('./routes/new-movie');
const express = require('express');
const app = express();
var exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.engine(
    "handlebars",
    exphbs({
      defaultLayout: "main",
      runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
      },
    })
  );
  app.set("view engine", "handlebars");

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

  console.log(config.get("jwtprivatekey"))
// if(!config.get('jwtprivatekey')) {
//   console.error('fatal error: private key is not given');
//   process.exit(1);
// }

app.use(express.json());
app.use('/',home);
app.use('/api/new-user',newuser);
app.use('/api/new-movie',newmovie);
app.use('/api/movies',movies);
app.use('/api/register',users);
app.use('/api/register',users);
app.use('/api/ratings',ratings);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));