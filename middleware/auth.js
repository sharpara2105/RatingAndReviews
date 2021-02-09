const jwt = require('jsonwebtoken');
const {LocalStorage} = require("node-localstorage");
var localStorage = new LocalStorage('./scratch');  


module.exports = function auth(req,res,next) {
    // const token = localStorage.getItem('token');
    // // const token = req.header('x-auth-token');
    // if(!token) return res.status(401).send('access denied. Not logged in');
    // // redirect to the login page : for this we will have to make a separate login component.
    // try{
    //     const decoded = jwt.verify(token,'jwtprivatekey');
    //     req.user = decoded;

    // }
    // catch(ex) {
    //     res.status(400).send('Invalid token');
    // }
    const token = localStorage.getItem('token');
    // console.log(token)
    if(!token) return res.status(401).send('access denied. Not logged in');
    try{
        const decoded = jwt.verify(token,'jwtprivatekey');
        // console.log(decoded)
        req.user=decoded
    }
    catch(ex) {
        res.status(400).send('Invalid token');
    }

    next();
}