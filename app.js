const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

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

// 使用路由器
app.use("/", require("./routes/home"));
app.use("/users", require("./routes/user"));

// port
app.listen(3000, () => {
  console.log(`App is running !`);
});
