const express = require('express');
const router  = express.Router();
const Post = require("../models/post")


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/profile', (req, res, next) => {
  res.render('profile');
});

router.get('/find', (req, res, next) => {
  res.render('find');
});

router.get('/post', (req, res, next) => {
  res.render('post');
});
router.get('/post-list', (req, res, next) => {
  res.render('post-list');
});

router.post("/posted-ad", (req, res)=>{
  const {postTitle, postPrice, postType, postDescription} = req.body
  console.log("eholladfadsf")
  Post.create({
    title: postTitle,
    price: postPrice,
    type: postType,
    description: postDescription
    
  })
  .then(newPostCreated =>{
    
    res.redirect("/post-list")
  })

})

module.exports = router;
