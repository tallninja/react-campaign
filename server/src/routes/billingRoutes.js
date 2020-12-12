const express = require("express");
const config = require("config");
const stripe = require("stripe")(config.get("stripe.secretKey"));

const requireLogin = require("../middlewares/requireLogin");

const router = express.Router();

router.post("/stripe", requireLogin, async (req, res) => {
  // console.log(req.body);
  const charge = await stripe.charges.create({
    amount: 500,
    currency: "usd",
    source: req.body.id,
    description: "5 credits for 5$",
  });
  req.user.credits += 5;
  const updatedUser = await req.user.save();
  res.send(updatedUser);
});

module.exports = router;
