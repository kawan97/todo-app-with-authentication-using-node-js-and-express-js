const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User =require('../models/User');
const {userAuthenticated} = require('./auth');


router.get('/',(req,res) => {
    //inser
  //  User.create({ userName: 'kawan',password: 'tawaw' }).then(newdata => console.log(newdata)).catch(err => console.log(err));
  //read
   User.find({}).select('-password').lean().then(users =>{res.json(users); }).catch(err => res.json(err));
 })
 

 router.post('/create',(req,res) => {
    const salt = bcrypt.genSaltSync(15);
    const hash = bcrypt.hashSync(req.body.password, salt);
    User.create({ userName: req.body.userName,password: hash }).then(newdata => res.json({'message':'user was created !!!!'})).catch(err =>res.json({'message':'we have some error!!!!'}));
  
});




module.exports = router;