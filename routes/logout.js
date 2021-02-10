const express = require('express');
const router = express.Router();
const {LocalStorage} = require("node-localstorage");
var localStorage = new LocalStorage('./scratch'); 



router.get('/',(req,res)=>{
    localStorage.clear();
    res.redirect('/');
})

module.exports = router;