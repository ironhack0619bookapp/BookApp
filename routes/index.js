require("dotenv").config();
const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const Book = require("../models/book");
const User = require("../models/user");
const axios = require("axios");

const googleKey = process.env.GKEY;

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/profile", (req, res, next) => {
  res.render("profile");
});

router.get("/postprofile:id", (req, res, next) => {
  User.findById(req.params.id).then(user => {
    res.render("postprofile", { user });
  });
});

router.get("/chart", (req, res, next) => {
  res.render("chart", { user: req.user });
});

router.get("/userschart", (req, res, next) => {
  res.render("userschart", { user: req.user });
});
router.get("/find", (req, res, next) => {
  res.render("find");
});

router.get("/chat", (req, res, next) => {
  const user = req.session.passport.user;
  res.render("chat", { user: user });
});

router.get("/post", (req, res, next) => {
  const user = req.session.passport.user;
  Book.find()
    .sort({ title: 1 })
    .then(book => {
      res.render("post", { user: user, book: book });
    });
});

router.get("/mypost", (req, res, next) => {
  const user = req.session.passport.user;
  Post.find({ author: user })
  .then(yourPosts => {
    res.render("post-list", { yourPosts });
  });
});
router.get("/post-list", (req, res, next) => {
  const user = req.session.passport.user;
  let owns = false;
  Post.find()
    .sort({ title: 1 })
    .then(yourPosts => {
      yourPosts.forEach(element => {
        if (element.author == user) {
          console.log("author: " + element.author + " user id: " + user);
          owns = true;
        }
      });

      res.render("post-list", { yourPosts, owns });
    });
});

router.get("/post/edit", (req, res, next) => {
  Post.findOne({ _id: req.query.post_id })
    .then(post => {
      res.render("post-edit", { post, user: req.user });
    })
    .catch(error => {
      console.log(error);
    });
});

router.post("/update/:id", (req, res, next) => {
  const { postTitle, postPrice, postType, postDescription } = req.body;
  const id = req.params.id;
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
  const {
    postTitle,
    postPrice,
    postType,
    postDescription,
    _id,
    bookId
  } = req.body;
  Post.create({
    author: _id,
    title: postTitle,
    price: postPrice,
    type: postType,
    book: bookId,
    description: postDescription
  }).then(newPostCreated => {
    res.redirect("/post-list");
  });
});

router.get("/findbook", (req, res, next) => {
  res.render("findbook", { user: req.user });
});

router.get("/bookresult/:id", (req, res, next) => {
  console.log(req.body.params);
  Book.findById(req.params.id).then(book => {
    res.render("bookresult", { user: req.user, book });
  });
});

router.get("/bookApiResult", (req, res, next) => {
  res.render("bookApiResult");
});

router.post("/bookresult", (req, res, next) => {
  const bookTitle = req.body.bookTitle;
  Book.findOne({ title: bookTitle })
    .then(book => {
      if (book == null) {
        axios
          .get(
            `https://www.googleapis.com/books/v1/volumes?q=${bookTitle}&maxResults=3&key=${googleKey}`
          )
          .then(bookData => {
            // const {
            //   title,
            //   authors,
            //   description,
            //   imageLinks
            // } = bookData.data.items[0].volumeInfo;
            // const isbn =
            //   bookData.data.items[0].volumeInfo.industryIdentifiers[1]
            //     .identifier;
            // const image = Object.values(imageLinks)[0];
            // let book = {
            //   title: title,
            //   author: authors,
            //   description: description,
            //   isbn: isbn,
            //   image: image
            // };

            const book = bookData.data.items;
            res.render("bookApiResult", { book });
          });
      } else {
        res.redirect("bookresult/" + book._id);
      }
    })
    .catch(error => {
      console.log(error);
    });
});

router.post("/bookCreate", (req, res, next) => {
  Book.create({
    title: req.body.bookTitle,
    author: req.body.bookAuthor,
    description: req.body.bookDescription,
    image: req.body.bookImage
  })
    .then(book => {
      res.redirect("/bookresult/" + book._id);
    })
    .catch(error => console.log(error));
});

router.get("/bookNamesForAutocompleter", (req, res) => {
  Book.find()
    .select({ title: 1 })
    .sort({ title: 1 })
    .then(allBooks => res.json(allBooks));
});

// router.post('/movie-creation', upload.single('photo'), (req, res, next) => {
//   Movie
//     .create({
//       name: req.body.name,
//       year: +req.body.year,
//       linkIMDB: req.body.linkIMDB,
//       photoLocation: `/uploads/${req.file.filename}`,
//       photoName: req.file.originalname,
//       recordedInLocation: {
//         type: "Point",
//         coordinates: [0, 0]
//       },
//       city: req.body.city,
//       country: req.body.country
//     })
//     .then(newMovieCreated => {
//       res.redirect('/movies-list');
//     })
// });

router.get("/login", (req, res, next) => {
  res.redirect("/auth/index");
});

module.exports = router;
