const express = require('express');
const router = express.Router();



router.get('/',(req,res)=>{
    res.render('new-user', {});
})

module.exports = router;