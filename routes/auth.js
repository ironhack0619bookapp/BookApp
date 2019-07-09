const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const ensureLogin = require("connect-ensure-login");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

router.get("/profile", ensureLogin.ensureLoggedIn(), (req, res, next) => {
    res.render("auth/profile", {user: req.user});
});

router.get("/all-users", ensureLogin.ensureLoggedIn(), (req, res, next) => {
    User.find().then(users => {
      res.render('auth/all-users', {users})
    })
    .catch((err) => {
      console.log(err)
    })
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/auth/profile",
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
      username,
      password: hashPass
    });

    newUser.save()
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      res.render("auth/signup", { message: "Something went wrong" });
    })
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/user/:ID", (req, res) => {
  User.findById(req.params.ID, (err, user) => {
    res.render('auth/user', {user})
  });
})

router.post('/:id/edit', (req, res, next) => {
  User.findById(req.params.id, (err, user) => {
    res.render('auth/edit', user)
  });
});

router.get("/edit", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render("auth/edit", {user: req.user});
});

router.post('/update/:id',(req, res, next) => {
  const username = req.body.usernameForm;
  const name = req.body.nameForm;
  const email = req.body.emailForm;
  const phone = req.body.phoneForm;
  const id = req.params.id;
  if (username === "" || name === "" || email === "" || phone === "") {
    res.render('auth/edit', { errorMessage: "Empty fields." });
    return
  }
  User
  .findByIdAndUpdate(id, {
    username: username,
    name: name,
    email: email,
    phone: phone
  })
  .then(updatedData => {
    res.redirect('../../auth/user/'+id);
  })
});

router.post('/password/:id',(req, res, next) => {
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
  if (newPassword !==  newPassword2) {
    res.render('auth/security', { errorMessage: "Write different password." });
    return
  }
  if( newPassword === ""){
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

router.get("/security", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render("auth/security", {user: req.user});
});

module.exports = router;
