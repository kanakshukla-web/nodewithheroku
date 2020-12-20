const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");

const port = process.env.PORT || 3000;
const staticPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//middleware
app.use(express.static(staticPath));
app.use(express.static(path.join(__dirname, "../images")));

// set view engine
app.set("view engine", "hbs");
app.set("views", templatePath);
hbs.registerPartials(partialsPath);

//template engine route
app.get("/login", (req, res) => {
  console.log("Welcome to the Contact");
  res.render("login", {
    name: "Kanak",
  });
});

app.get("/", (req, res) => {
  console.log("Welcome to the Home");
  //res.render("index");
  res.send("Welcome to Home")
});

app.listen(port, () => {
  console.log(`server is listening at port ${port}`);
})
