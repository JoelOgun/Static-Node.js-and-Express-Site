const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const { projects } = require("./data.json");
const path = require("path");
const { Http2ServerRequest } = require("http2");

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
  //res.status(500).render("error", { err });
  res.render("about");
});

app.get("/projects/:id", (req, res, next) => {
  // id is a variable and render different projects
  const projectId = req.params.id;
  res.render("project", { project: projects[projectId] });
});
// 404 Error Handler
app.use(function (req, res, next) {
  console.log("404 error handler called");
  const err = new Error();
  err.status = 404;
  err.message =
    "Oops!  It looks like the page you're looking for does not exist.";
  res.status(404).render("page-not-found", { err });
  //next(err);
});

app.use((err, req, res, next) => {
  if (err.status === 404) {
    console.log("404 error handler called");
    res.status(404).render("page-not-found", { err });
  } else {
    console.log("500 error handler called");
    err.message = "Oops, something went wrong.";
    res.status(err.status || 500).render("error", { err });
  }
  console.log(err.message);
});

app.listen(port, () => {
  console.log("The application is listening on localhost:3000!");
});
