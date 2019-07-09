const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const Book = require("../models/book");
const axios = require("axios");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/profile", (req, res, next) => {
  res.render("profile");
});

router.get("/find", (req, res, next) => {
  res.render("find");
});

router.get("/post", (req, res, next) => {
  res.render("post");
});
router.get("/post-list", (req, res, next) => {
  Post.find()
    .sort({ title: 1 })
    .then(yourPosts => {
      res.render("post-list", { yourPosts });
    });
});

router.get("/post/edit", (req, res, next) => {
  Post.findOne({ _id: req.query.post_id })
    .then(post => {
      res.render("post-edit", { post });
    })
    .catch(error => {
      console.log(error);
    });
});

router.post("/update/:id", (req, res, next) => {
  const { postTitle, postPrice, postType, postDescription } = req.body;
  const id = req.params.id;
  console.log("prueba");
  Post.findByIdAndUpdate(id, {
    title: postTitle,
    price: postPrice,
    type: postType,
    description: postDescription
  })
    .then(yourPosts => {
      res.redirect("/post-list");
    })
    .catch(error => {
      console.log(error);
    });
});

router.post("/posted-ad", (req, res) => {
  const { postTitle, postPrice, postType, postDescription } = req.body;
  Post.create({
    title: postTitle,
    price: postPrice,
    type: postType,
    description: postDescription
  }).then(newPostCreated => {
    res.redirect("/post-list");
  });
});

router.get("/findbook", (req, res, next) => {
  res.render("findbook");
});

router.get("/bookresult", (req, res, next) => {
  res.render("bookresult");
});

router.post("/bookresult", (req, res, next) => {
  const bookTitle = req.body.bookTitle;
  const bookAuthor = req.body.bookAuthor;
  //console.log(bookTitle)
  Book.findOne({ title: bookTitle } || {author: bookAuthor })
    .then(book => {
      if (book == null) {
        // bookTitle == null? bookTitle = bookAuthor: null
        console.log("**************************");
        axios
          .get(`https://www.googleapis.com/books/v1/volumes?q=${bookTitle}`)
          .then(bookData => {
            const {
              title,
              authors,
              description,
              imageLinks
            } = bookData.data.items[0].volumeInfo;
            const isbn =
              bookData.data.items[0].volumeInfo.industryIdentifiers[1]
                .identifier;
            const image = Object.values(imageLinks)[0];
            let book = {
              title: title,
              author: authors,
              description: description,
              isbn: isbn,
              image: image
            };
            console.log(isbn);

            res.render("bookresult", { book });
          });
      } else {
        res.render("bookresult", { book });
      }
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
