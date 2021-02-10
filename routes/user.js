const {User,validateUser} = require('../models/user');
const auth = require('../middleware/auth')
const _ = require('lodash');
const bcrpyt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const {LocalStorage} = require("node-localstorage");
var localStorage = new LocalStorage('./scratch'); 
const express = require('express');
const router = express.Router();

router.get('/me',auth,async(req,res)=>{
    const user = await User.findById(req.user._id).select('email')
    res.render('userPage',{user})
    // res.send(user);
})


router.post('/',async(req,res) => {
    const {error} = validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email : req.body.email});
    if(user) {
        // res.status(400).send('already registered user');
        res.redirect('/api/register/me')
    }

    const salt = await bcrpyt.genSalt(10);
    const hashed = await bcrpyt.hash(req.body.password,salt);



    user = new User({
        name : req.body.name,
        email : req.body.email,
        password : hashed
    });
    await user.save();

    const token = jwt.sign({_id : user.id},'jwtprivatekey');
    // res.send(_.pick(user,['name','email','role'])); 
    // res.send(token);
    localStorage.setItem('token',token);
    res.redirect('/api/register/me')
    // res.header('x-auth-token',token).send(_.pick(user,['_id','name','email','role']));
});



module.exports = router;