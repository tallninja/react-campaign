const express = require("express");
const mongoose = require("mongoose");

const requireLogin = require("../middlewares/requireLogin");
const checkCredits = require("../middlewares/checkCredits");
const surveyTemplate = require("../templates/surveyTemplate");

const Mailer = require("../utils/Mailer");

require("../models/Survey");

const router = express.Router();
const Survey = mongoose.model("surveys");

router.post("/surveys", requireLogin, checkCredits, async (req, res) => {
  console.log(req.body);
  const { title, subject, body, recipients } = req.body;
  const survey = new Survey({
    title: title,
    subject: subject,
    body: body,
    recipients: recipients.split(",").map((email) => ({ email: email.trim() })),
    _user: req.user.id,
    dateSent: Date.now(),
  });

  try {
    const mailer = new Mailer(survey, surveyTemplate(survey));
    await mailer.send();
    await survey.save();
    req.user.credits -= 1;
    const updatedUser = await req.user.save();
    res.status(200).send(updatedUser);
  } catch (err) {
    res.status(422).send(err);
  }

  // res.status(200).send({ success: "Survey sent Successfully !" });
});

module.exports = router;
