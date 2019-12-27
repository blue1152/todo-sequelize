const express = require("express");
const app = express();
const port = 3000;
const db = require("./models");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const passport = require("passport");

// setting view engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// setting body-parser
app.use(bodyParser.urlencoded({ extended: true }));
// setting method-override
app.use(methodOverride("_method"));
// setting static files
app.use(express.static("public"));

// session
app.use(
  session({
    secret: "my key", // 定義私鑰（字串)
    resave: "false",
    saveUninitialized: "false"
  })
);
// Passport
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

// routes
app.use("/", require("./routes/home"));
app.use("/users", require("./routes/user"));
app.use("/todos", require("./routes/todo"));

// 設定 express port 3000
app.listen(port, () => {
  console.log(`App is running on port ${port}!`);
});
