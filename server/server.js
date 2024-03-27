const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

//middle
app.use(express.json());
app.use(cors());

// route
const loginRoute = require("./api/login/login.controller");
const homeRoute = require("./api/home/home.controller");

app.use("/api/login", loginRoute);
app.use("/api/home", homeRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
