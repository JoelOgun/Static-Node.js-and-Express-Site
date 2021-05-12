const express = require("express");
const app = express();
const port = 3000;
const { projects } = require("./data.json");
const path = require("path");

//Middleware
app.set("view engine", "pug");
// Serving the static files located in the public folder
app.use("/static", express.static("public"));

// Routes
app.get("/", (req, res) => {
  // render the index pug template, pass pug the projects object
  // the second parameter is the local set  to view the data object
  res.render("index", { projects });
});

app.get("/about", (req, res) => {
  // render the about pug template, pass pug the projects object
  res.render("about");
});

app.listen(port, () => {
  console.log("The application is running on localhost:3000!");
});
