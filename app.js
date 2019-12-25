const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const passport = require("passport");

// database
const db = require("./models");
const Todo = db.Todo;
const User = db.User;
// view engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// other middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "your secret key",
    resave: "false",
    saveUninitialized: "false"
  })
);
// 使用 Passport
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
// 使用路由器
app.use("/", require("./routes/home"));
app.use("/users", require("./routes/user"));

// port
app.listen(3000, () => {
  console.log(`App is running !`);
});
