const express = require('express');
const router = express.Router();
const { userAuthenticated } = require('./auth');

const Post = require('../models/Post');
const User = require('../models/User');
//const {userAuthenticated} = require('./auth');


router.get('/',userAuthenticated ,(req, res) => {
  Post.find({}).populate('user', '-password').lean()
    .then(posts => {
      res.json(posts)
    })
    .catch(err => res.json(err));

})

const jwt = require('jsonwebtoken');
const { json } = require('body-parser');


router.post('/create', userAuthenticated, (req, res) => {
  try {
    const decoded = jwt.verify(req.body.user, 'fsdfdsfdsknlnklnfdsnncnvcnd');
    Post.create({ title: req.body.title, info: req.body.info, user: decoded.data._id})
      .then(newdata => res.json(newdata))
      .catch(err => res.json(err)
      );
  } catch (err) {
    res.json('false');
  }


});
router.get('/userid/:id', userAuthenticated, (req, res) => {
  try {
    const decoded = jwt.verify(req.params.id, 'fsdfdsfdsknlnklnfdsnncnvcnd');
  res.json({_id :decoded.data._id ,userName :decoded.data.userName})
  } catch (err) {
    res.json('false');
  }


});



//s
router.get('/update/:id', (req, res) => {
  Post.findOne({ '_id': req.params.id }).populate('user', '-password').lean()
    .then(post => {
      if (post) {

        return res.json(post)

      }else{
        return res.json(false);
      }
      //res.render('post/index',{posts,posts})
    })
    .catch(err => res.json(false));
  //res.send('Fuck Your Self')
});

//  res.render('user/update')


router.put('/update/:id', (req, res) => {
  Post.findOne({ '_id': req.params.id }).populate('user', '-password')
    .then(post => {
      post.title = req.body.title;
      post.info = req.body.info;
      post.save();
      res.json(post)
      //res.render('post/index',{posts,posts})
    })
    .catch(err => res.json({ 'message': 'Fuck Your Self' }));
});

router.post('/delete/:id', (req, res) => {
  console.log(req.params.id)
  Post.findOne({ '_id': req.params.id })
    .then(post => {
      console.log(post)
      post.remove();
      res.status(200).json({ message: "post is  deleted Successfully" })


    })
    .catch(err => res.json(err));
});


module.exports = router;