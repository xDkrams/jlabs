const express = require("express");
const router = express.Router();

const { login } = require("./login.service");

// route
router.post("/", loginUser);

function loginUser(req, res, next) {
  const { username, password } = req.body;
  const isAuthenticated = login(username, password);
  if (isAuthenticated) {
    res.json({ message: "Login successful" });
  } else {
    res.status(401).json({ error: "Invalid username or password" });
  }
}

module.exports = router;
