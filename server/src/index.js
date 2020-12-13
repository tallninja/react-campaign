const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/authRoutes");
const billingRoutes = require("./routes/billingRoutes");
const surveyRoutes = require("./routes/surveyRoutes");

// mongo
require("./models/User");
const mongoURI = config.get("mongoAtlas.mongoURI");
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// passport
require("./services/passport"); //ensures that the passport service is executed

// express
const app = express();

// body-parser
app.use(bodyParser.json());

// cookies and auth middlewares
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // expires in... 30 days
    keys: [config.get("cookies.cookieKey")], // key used to generate cookies
  })
);
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use("/auth", authRoutes);
app.use("/billing", billingRoutes);
app.use("/api", surveyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
