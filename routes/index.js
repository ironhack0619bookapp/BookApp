
require('dotenv').config();
const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const Book = require("../models/book");
const axios = require("axios");

var autocomplete = require('autocompleter');

const googleKey = process.env.GKEY;



/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/profile", (req, res, next) => {
  res.render("profile");
});

router.get("/chart", (req, res, next) => {
  res.render("chart", { user: req.user });
});

router.get("/find", (req, res, next) => {
  res.render("find");
});

router.get("/chat", (req, res, next) => {
  const user = req.session.passport.user;
  res.render("chat", { user: req.user });
});


router.get("/post", (req, res, next) => {
  const user = req.session.passport.user
  res.render("post", { user });
});

router.get("/mypost", (req, res, next) => {
  const user = req.session.passport.user
  console.log(user)
  Post.find({ author: user })
    .then(yourPosts => {
      yourPosts = yourPosts.map(post => {
        post.edit = true;
        post.aut = req.user.unsermane;
        return post
      })
      res.render("post-list", { yourPosts, user: req.user });

    });
});

router.get("/post-list", (req, res, next) => {
  Post.find()
    .sort({ title: 1 })
    .then(yourPosts => {
      yourPosts = yourPosts.map(post => {
        if (post.author == req.user.id) {
          post.edit = true;
        }
        else {
          post.edit = false;
        }
        return post
      })
      res.render("post-list", { yourPosts, user: req.user });
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

router.get('delete', (req,res,next) => {
  Post.deleteOne({ id: id })
    .then(post => {
      res.redirect("../auth/index",);
    })
    .catch(error => {
      console.log(error);
      res.redirect("../auth(index");
    });
})

router.get("/delete", (req, res, next) => {
  res.render("delete", {id: req.query.post_id} );
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
  const { postTitle, postPrice, postType, postDescription, _id } = req.body;
  Post.create({
    author: _id,
    title: postTitle,
    price: postPrice,
    type: postType,
    description: postDescription
  }).then(newPostCreated => {
    res.redirect("/post-list");
  });
});

router.get("/findbook", (req, res, next) => {
  res.render("findbook", { user: req.user });
});

router.get("/bookresult/:id", (req, res, next) => {
  Book.findById(req.params.id)
    .then(book => {
      res.render("bookresult", { user: req.user, book });
    })

});


router.get("/bookApiResult", (req, res, next) => {
  res.render("bookApiResult");
});

router.post("/bookresult", (req, res, next) => {
  const bookTitle = req.body.bookTitle;
  console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
  Book.findOne({ title: bookTitle })
    .then(book => {
      // console.log(book.length);
      if (book == null) {

        axios
          .get(`https://www.googleapis.com/books/v1/volumes?q=${bookTitle}&maxResults=3&key=${googleKey}`)
          .then(bookData => {
            // console.log("esto es book:"+boo2k)
            // console.log(bookData)
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
            // console.log(isbn);

            const book = bookData.data.items
            // console.log(book.volumeInfo.industryIdentifiers[0].identifier)
            // console.log(book.volumeInfo)
            console.log(book[0].volumeInfo.imageLinks.thumbnail)
            res.render("bookApiResult", { book, user: req.user });
          });
      } else {
        console.log(book)
        //res.render("bookresult", { book });
        res.redirect("bookresult/" + book._id)
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
  }).then((book) => {
    res.redirect("/bookresult/" + book._id)
  })
    .catch(error =>
      console.log(error))
})

router.get("/bookNamesForAutocompleter", (req, res) => {
  Book
    .find()
    .select({ title: 1 })
    .sort({ title: 1 })
    .then(allBooks => res.json(allBooks))
})


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
  res.redirect("/auth/index")
})

module.exports = router;
