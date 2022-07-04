const express =require('express');
const app =express();
const mongoose =require('mongoose');
const bodyParser = require('body-parser');




//const User =require('./models/User');
//const upload = require('express-fileupload');
//app.use(upload());

//const path = require('path')
//app.use(express.static(path.join(__dirname, 'public')));


//mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);
const userRoute =require('./routes/user')
const postRoute = require('./routes/post')
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use('/user', userRoute)
app.use('/post', postRoute)

const jwt = require('jsonwebtoken');
const User =require('./models/User');
const bcrypt = require('bcryptjs');

app.post('/login',(req,res) => {

 User.findOne({'userName' : req.body.userName}).then(user =>{
    const check =bcrypt.compareSync(req.body.password, user.password); 

  if(check){
    const token= jwt.sign({
      data: {_id: user._id,userName:user.userName}
    }, 'fsdfdsfdsknlnklnfdsnncnvcnd', { expiresIn: '1h' });
  
    return res.json(token);
  }
  return res.json(false)

 }).catch(err => res.json(false)
 )
 
  
});

app.get('/tokenn/:id',(req,res) => {
  try {
    const decoded = jwt.verify(req.params.id, 'fsdfdsfdsknlnklnfdsnncnvcnd');
    res.json({userName:decoded.data.userName,_id:decoded.data._id,auth:true,token:req.params.id})

  } catch(err) {
    res.json({userName:null,_id:null,auth:false,token:null})
  }
 
   
 });

 app.get('/authcheck/:id',(req,res) => {
  try {
    const decoded = jwt.verify(req.params.id, 'fsdfdsfdsknlnklnfdsnncnvcnd');
    res.json(true)

  } catch(err) {
  res.send('false');
  }
 
   
 });


app.get('/logout', function(req, res){
  //  req.logout();
   // res.redirect('/user/login');
  });


app.listen(3000,() => console.log('lestning'));