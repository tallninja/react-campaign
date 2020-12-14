const express = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");

const requireLogin = require("../middlewares/requireLogin");
const checkCredits = require("../middlewares/checkCredits");
const surveyTemplate = require("../templates/surveyTemplate");

const Mailer = require("../utils/Mailer");

require("../models/Survey");

const router = express.Router();
const Survey = mongoose.model("surveys");

router.post("/surveys", requireLogin, checkCredits, async (req, res) => {
  // console.log(req.body);
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
    await mailer.send(); // send the survey to send grid
    await survey.save(); // save the survey to our database
    req.user.credits -= 1; // decrement our user credits
    const updatedUser = await req.user.save(); // save our updated user to the database
    res.status(200).send(updatedUser);
  } catch (err) {
    res.status(422).send(err);
  }

  // res.status(200).send({ success: "Survey sent Successfully !" });
});

router.get("/surveys", requireLogin, async (req, res) => {
  const userSurveys = await Survey.find({ _user: req.user.id }).select({
    recipients: false,
  }); // exclude the list of recipients
  res.send(userSurveys);
});

router.get("/surveys/:surveyId/:choice", (req, res) => {
  res.send("<p>Thanks for Voting !</p>");
});

router.post("/surveys/webhooks", (req, res) => {
  const events = _.map(req.body, (event) => {
    const path = new URL(event.url).pathname; // removes the TLD from the url
    const parser = new Path("/api/surveys/:surveyId/:choice"); // parses the url and gets the surveyId and choice
    const match = parser.test(path); // checks if the url has a surveyId and choice
    if (match) {
      return {
        email: event.email,
        surveyId: match.surveyId,
        choice: match.choice,
      };
    }
  });
  const compactEvents = _.compact(events); // removes and undefined object
  const uniqueEvents = _.uniqBy(compactEvents, "email", "surveyId"); // makes sure the events are unique
  _.map(uniqueEvents, ({ email, surveyId, choice }) => {
    return Survey.updateOne(
      {
        _id: surveyId,
        recipients: {
          $elemMatch: { email: email, responded: false },
        },
      },
      {
        $inc: { [choice]: 1 },
        $set: { "recipients.$.responded": true },
        lastResponded: new Date(),
      }
    ).exec();
  });
  res.send({ success: "success" });
});

module.exports = router;
