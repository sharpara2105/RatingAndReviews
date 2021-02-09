const express = require('express');
const router = express.Router();



router.get('/',(req,res)=>{
    res.render('home', { msg: 'Handlebars are Cool!' });
})

module.exports = router;