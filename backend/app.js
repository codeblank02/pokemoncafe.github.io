const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require('multer');
const Item = require("./models/post");
const Slot = require("./models/slots");
const Food = require("./models/food");
const Drinks = require("./models/drinks");
const Sweets = require("./models/sweets");
const Latte = require("./models/latte");
const News = require('./models/news');
const Goods = require("./models/goods");
const SpGoods = require("./models/spgoods");
const Faq = require('./models/faq');
const Users = require('./models/users');
const path = require('path');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const DIR = './src/assets/images';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({storage: storage});

mongoose
  .connect(
    "mongodb://127.0.0.1:27017/myblogs" ,{
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post('/api/upload',upload.single('photo'), function (req, res) {
  if (!req.file) {
      console.log("No file received");
      return res.send({
        success: false
      });
    } else {
      console.log('file received');
      return res.send('assets/images/' + req.file.filename);
    }
});

app.post("/api/posts",upload.single('photo'), (req, res, next) => {
  const post = new Item({
    _id:new mongoose.Types.ObjectId(),
    imageUrl: req.body.imageUrl,
    name: req.body.name,
    price: req.body.price,
    content: req.body.content
  });
  post.save().
  then(docs => {
    console.log(docs);
  }).catch(console.log("error in post"));
  res.status(201).json({
    message: "Post added successfully",
    posts: post
  });
});

app.get("/api/posts", (req, res, next) => {
  Item.find().exec().then(documents => {
    res.status(200).json( {
      posts : documents});
  }).catch();
});

app.post("/api/user", (req, res, next) => {
  const user = new Users({
    _id:new mongoose.Types.ObjectId(),
    username: req.body.username,
    password: req.body.password
  });
  user.save().
  then(docs => {
    console.log(docs);
  }).catch(console.log("error in user post"));
  res.status(201).json({
    message: "Post added successfully",
    users: user
  });
});

app.post('/api/usercheck', (req,res,next) => {
  console.log(req);
  Users.findOne({username: req.body.username}).exec().then(documents =>{
    if(documents){
      if(documents.password === req.body.password) {
        res.status(200).json({
          message: 1
      })
    }
      else {
        res.status(200).json({
          message: 0
      })
    }
  }
  else {
    res.status(200).json({
      message: 0
    })
  }
  })
    .catch(console.log('error in checks'))
});


app.get('/api/user', function (req, res, next) {
  Users.find().exec().then(documents => {
    res.status(200).json( {
      users : documents});
  }).catch(console.log("error in user get"));
});

app.post("/api/slots", (req, res, next) => {
  const slot = new Slot({
    _id:new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    contact: req.body.contact,
    date: req.body.date,
    time: req.body.time,
    people: req.body.people
  });
  slot.save().
  then(docs => {
    console.log(docs);
  }).catch(console.log("error in slot post"));
  res.status(201).json({
    message: "Post added successfully",
    slots: slot
  });
});

app.get('/api/slots', function (req, res, next) {
  Slot.find().exec().then(documents => {
    res.status(200).json( {
      slots : documents});
  }).catch(console.log("error in slot get"));
});

app.post('/api/getslots', function (req, res, next) {
  Slot.findOne({email: req.body.email}).exec().then(documents => {
    res.status(200).json( {
      slots : documents});
  }).catch(console.log("error in slot get"));
});

app.post("/api/usercheck", function (req, res, next) {
  Users.findOne({username: req.body.username}).then(documents =>
    {
    if(documents)
    {
      if(documents.password == req.body.password)
      {
        res.status(200).json({
          message: 1
        });
      }
      else{
        res.status(200).json({
          message: 2
        });

      }
    }
    else{
      res.status(200).json(
        {
          message: req.body.username
        })
    }

  });
});

app.post("/api/food",upload.single('photo'), (req, res, next) => {
  const food = new Food({
    _id:new mongoose.Types.ObjectId(),
    imageUrl: req.body.imageUrl,
    name: req.body.name,
    price: req.body.price,
    content: req.body.content
  });
  food.save().
  then(docs => {
    console.log(docs);
  }).catch(console.log("error in food post"));
  res.status(201).json({
    message: "Post added successfully",
    food: food
  });
});

app.get('/api/food', function (req, res, next) {
  Food.find().exec().then(documents => {
    res.status(200).json( {
      food : documents});
  }).catch(console.log("error in food get"));
});

app.post("/api/drinks",upload.single('photo'), (req, res, next) => {
  const drinks = new Drinks({
    _id:new mongoose.Types.ObjectId(),
    imageUrl: req.body.imageUrl,
    name: req.body.name,
    price: req.body.price,
    content: req.body.content
  });
  drinks.save().
  then(docs => {
    console.log(docs);
  }).catch(console.log("error in drinks"));
  res.status(201).json({
    message: "Post added successfully",
    drinks: drinks
  });
});

app.get('/api/drinks', function (req, res, next) {
  Drinks.find().exec().then(documents => {
    res.status(200).json( {
      drinks : documents});
  }).catch(console.log("error in drinks get"));
});

app.post("/api/sweets",upload.single('photo'), (req, res, next) => {
  const sweets = new Sweets({
    _id:new mongoose.Types.ObjectId(),
    imageUrl: req.body.imageUrl,
    name: req.body.name,
    price: req.body.price,
    content: req.body.content
  });
  sweets.save().
  then(docs => {
    console.log(docs);
  }).catch(console.log("error in sweets"));
  res.status(201).json({
    message: "Post added successfully",
    sweets: sweets
  });
});

app.get('/api/sweets', function (req, res, next) {
  Sweets.find().exec().then(documents => {
    res.status(200).json( {
      sweets : documents});
  }).catch(console.log("error in sweets get"));
});

app.post("/api/latte",upload.single('photo'), (req, res, next) => {
  const latte = new Latte({
    _id:new mongoose.Types.ObjectId(),
    imageUrl: req.body.imageUrl,
    name: req.body.name,
    price: req.body.price,
    content: req.body.content
  });
  latte.save().
  then(docs => {
    console.log(docs);
  }).catch(console.log("error in latte"));
  res.status(201).json({
    message: "Post added successfully",
    latte: latte
  });
});

app.get('/api/latte', function (req, res, next) {
  Latte.find().exec().then(documents => {
    res.status(200).json( {
      latte : documents});
  }).catch(console.log("error in latte get"));
});

app.post("/api/faq", (req, res, next) => {
  const faq = new Faq({
    _id:new mongoose.Types.ObjectId(),
    news: req.body.name,
    newsdata: req.body.content
  });
  faq.save().
  then(docs => {
    console.log(docs);
  }).catch(console.log("error in news"));
  res.status(201).json({
    message: "Post added successfully",
    faq: faq
  });
});

app.get('/api/faq', function (req, res, next) {
  Faq.find().exec().then(documents => {
    res.status(200).json( {
      faq : documents});
  }).catch(console.log("error in faq get"));
});

app.post("/api/news", (req, res, next) => {
  const news = new News({
    _id:new mongoose.Types.ObjectId(),
    news: req.body.name,
    newsdata: req.body.content
  });
  news.save().
  then(docs => {
    console.log(docs);
  }).catch(console.log("error in news"));
  res.status(201).json({
    message: "Post added successfully",
    news: news
  });
});

app.get('/api/news', function (req, res, next) {
  News.find().exec().then(documents => {
    res.status(200).json( {
      news : documents});
  }).catch(console.log("error in news get"));
});

app.post("/api/goods", (req, res, next) => {
  const goods = new Goods({
    _id:new mongoose.Types.ObjectId(),
    imageUrl: req.body.imageUrl,
    name: req.body.name,
    price: req.body.price,
    content: req.body.content
  });
  goods.save().
  then(docs => {
    console.log(docs);
  }).catch(console.log("error in goods"));
  res.status(201).json({
    message: "Post added successfully",
    goods: goods
  });
});

app.get('/api/goods', (req,res,next) => {
  Goods.find().exec().then(documents => {
    res.status(200).json( {
      goods : documents});
  }).catch(console.log("error in goods get"));
});

app.post("/api/spgoods",upload.single('photo'), (req, res, next) => {
  const spgoods = new SpGoods({
    _id:new mongoose.Types.ObjectId(),
    imageUrl: req.body.imageUrl,
    name: req.body.name,
    price: req.body.price,
    content: req.body.content
  });
  spgoods.save().
  then(docs => {
    console.log(docs);
  }).catch(console.log("error in spgoods"));
  res.status(201).json({
    message: "Post added successfully",
    spgoods: spgoods
  });
});

app.get('/api/spgoods', function (req, res, next) {
  SpGoods.find().exec().then(documents => {
    res.status(200).json( {
      spgoods : documents});
  }).catch(console.log("error in spgoods get"));
});

module.exports = app;
