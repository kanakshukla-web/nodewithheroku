const express = require("express");
const app = express();
const path = require("path");

const port = process.env.PORT || 3000;
const staticPath = path.join(__dirname, "../public");

//middleware
app.use(express.static(staticPath));
app.use(express.static(path.join(__dirname,'../images')));

// set view engine
app.set("view engine", "hbs");

//template engine route
app.get("/contact", (req, res) => {
  console.log("Welcome to the Contact");
  res.render("index", {
    name: "Kanak",
  });
});

app.get("/", (req, res) => {
  console.log("Welcome to the Home");
  res.send("Welcome to the home");
});

app.listen(port, () => {
  console.log(`server is listening at port ${port}`);
});
