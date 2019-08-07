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

  res.render("chat", { user: req.user });
});

router.get("/post", (req, res, next) => {

  const user = req.session.passport.user;
  Book.find()
    .sort({ title: 1 })
    .then(book => {
      res.render("post", { user: user, book: book });
    });

  // const user = req.session.passport.user
  // res.render("post", { user });

});

router.get("/mypost", (req, res, next) => {
  const user = req.session.passport.user;
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

router.post("/post/edit/:id", (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then(post => {
      res.render("post-edit", { post, user: req.user });

    })
    .catch(error => {
      console.log(error);
    });
});

router.post('/delete/:id', (req,res,next) => {
  const id = req.params.id;
  console.log(id)
  Post.findByIdAndRemove(id)
    .then(post => {
      res.redirect("../auth/index");
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
    bookSelect
  } = req.body;
  Post.create({
    author: req.user._id,
    title: postTitle,
    price: postPrice,
    type: postType,
    book: bookSelect,
    description: postDescription
  })
  .then((post) => {
    Post.find({book: post.book})
    .then(yourPosts => { 
      res.render("post-list", { yourPosts });
    })
    .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
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
  Book.findOne({ title: bookTitle })
    .then(book => {
      if (book == null) {

        axios
          .get(
            `https://www.googleapis.com/books/v1/volumes?q=${bookTitle}&maxResults=3&key=${googleKey}`
          )
          .then(bookData => {
            const book = bookData.data.items;
            console.log(book[0].volumeInfo.imageLinks.thumbnail)
            res.render("bookApiResult", { book, user: req.user });

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

router.get("/login", (req, res, next) => {
  res.redirect("/auth/index");
});

router.post("/postBook", (req, res, next) => {
  Post.find({ book: req.body.bookId }).then(yourPosts => {
    res.render("post-list", { yourPosts });
  });

  console.log("diocane", req.body.bookId)
})


module.exports = router;
