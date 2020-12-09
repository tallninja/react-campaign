const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cookieSession = require("cookie-session");
const passport = require("passport");

// mongo
require("./models/user");
const mongoURI = config.get("mongoAtlas.mongoURI");
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// passport
require("./services/passport"); //ensures that the passport service is executed

// express
const app = express();

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
const authRoutes = require("./routes/auth_routes");
authRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
