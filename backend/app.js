const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");
const localStrategy = require("./auth/local");
const jwtStrategy = require("./auth/jwt");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ limit: "200mb", extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());
app.use(morgan("common"));
app.use(passport.initialize());

passport.use(localStrategy);
passport.use(jwtStrategy);

require("./routes")(app);

module.exports = app;
