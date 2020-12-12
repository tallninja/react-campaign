const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get(
  "/google", // when a user navigates to this url then use google OAuth
  passport.authenticate("google", {
    // we are telling passport to use the google strategy
    scope: ["profile", "email"], // the scope of the user data that we want google to give us
  })
);

router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  res.redirect("/surveys");
}); // does a follow up to google with the code

// logout the current user
router.get("/logout", (req, res) => {
  req.logout(); // passport automatically attaches the logout method to the request
  res.redirect("/");
});

// loged in user info
router.get("/current_user", (req, res) => {
  res.send(req.user);
});

module.exports = router;
