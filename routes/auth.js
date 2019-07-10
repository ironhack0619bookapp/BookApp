const express = require("express");
const passport = require('passport');
const router = express.Router();
const ensureLogin = require("connect-ensure-login");
const User = require("../models/user");
const uploadCloud = require('../config/cloudinary.js');
const nodemailer = require('nodemailer');

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

let transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: `${process.env.USER_NAME}`,
    pass: `${process.env.PASS}`
  }
});


router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

router.get("/index", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render("auth/index", { user: req.user });
});

router.get("/all-users", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  User.find().then(users => {
    res.render('auth/all-users', { users , user: req.user})
  })
    .catch((err) => {
      console.log(err)
    })
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/auth/index",
  failureRedirect: "/",
  failureFlash: true,
  passReqToCallback: true
}));

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;
  const email = req.body.email;
  const placeLocation = { 
    type: 'Point', 
    coordinates: [-4.0000000, 40.0000000] 
  }
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let token = '';
  for (let i = 0; i < 25; i++) {
    token += characters[Math.floor(Math.random() * characters.length)];
  }
  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      name: name,
      username: username,
      password: hashPass,
      email: email,
      phone: "",
      location: placeLocation,
      imgName: "Profile Picture",
      imgPath: "https://image.flaticon.com/icons/svg/149/149071.svg",
      type: "user",
      token: token,
      status: "Pending Confirmation",
    });

    newUser.save()
      .then(() => {
        transporter.sendMail({
          from: '"BookApp 📚" <process.env.USER>',
          to: email,
          subject: 'Confirmation email - Start Enjoy 📖',
          text: 'Awesome Message',
          html: `<b>Confirm Account</b>
        <a
        href="http://localhost:3000/auth/confirm/${token}">Click here</a> and discover books meeting people.`
        })
        .then(() => res.redirect("/auth/confirm"))
        .catch(error => console.log(error))

      })
      .catch(err => {
        res.render("auth/signup", { message: "Something went wrong" });
      })
  });
});

router.get("/confirm/:token", (req, res) => {
  let token = req.params.token;
  User.findOneAndUpdate({ token: req.params.token }, { $set: { status: "Active" } }, { new: true })
    .then((user) => {
      console.log("User activated");
      res.redirect("/auth/login")
    }).catch((err) => {
      console.log(err)
    })
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/user/:ID", (req, res) => {
  if (req.params.ID === req.user.id) {
    res.redirect("../../auth/profile");
  }
  else{
    User.findById(req.params.ID, (err, user) => {
      res.render('auth/user', { user })
    });
  }
})

router.get('/:id/edit', (req, res, next) => {
  User.findById(req.params.id, (err, user) => {
    res.render('auth/edit', user)
  });
});

router.get("/edit", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render("auth/edit", { user: req.user });
});

router.get("/picture", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render("auth/picture", { user: req.user });
});

router.post("/update-pict", uploadCloud.single('photo'), (req, res, next) => {
  const imgPath = req.file.url;
  const imgName = req.file.originalname;
  const id = req.user.id;
  User
    .findByIdAndUpdate(id, {
      imgPath: imgPath,
      imgName: imgName
    }, { new: true })
    .then(updatedData => {
      res.redirect('index');
    })
});

router.post('/update/:id', (req, res, next) => {
  const username = req.body.usernameForm;
  const name = req.body.nameForm;
  const email = req.body.emailForm;
  const phone = req.body.phoneForm;
  const id = req.params.id;
  if (username === "" || name === "" || email === "" || phone === "") {
    res.redirect('/auth/' + id + '/edit');
    return
  }
  User
    .findByIdAndUpdate(id, {
      username: username,
      name: name,
      email: email,
      phone: phone
    }, { new: true })
    .then(updatedData => {
      res.redirect('../../auth/profile');
    })
});

router.post('/password/:id', (req, res, next) => {
  const password = req.body.passwordForm;
  const newPassword = req.body.newpasswordForm;
  const newPassword2 = req.body.newpassword2Form;
  const id = req.params.id;
  // const saltAnt = bcrypt.genSaltSync(bcryptSalt);
  // const hashPassAnt = bcrypt.hashSync(password, saltAnt);
  // if (hashPassAnt !== req.user.password) {
  //   res.render('auth/security', { errorMessage: "Incorrect password." });
  //   return
  // }
  if (newPassword !== newPassword2) {
    res.render('auth/security', { errorMessage: "Write different password." });
    return
  }
  if (newPassword === "") {
    res.render('auth/security', { errorMessage: "Password can't be empty." });
    return
  }
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(newPassword, salt);
  User
    .findByIdAndUpdate(id, {
      password: hashPass,
    })
    .then(updatedData => {
      res.redirect('/');
    })
});

router.get(
  "/auth/slack/callback",
  passport.authenticate("slack", {
      successRedirect: "/auth/index",
      failureRedirect: "/auth/signup"
  })
);

router.get("/security", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render("auth/security", { user: req.user });
});

router.get("/profile", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render("auth/profile", { user: req.user });
});

router.get("/confirm", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render("auth/confirm", { user: req.user });
});

module.exports = router;
