// Dummy function for login (replace with your authentication logic)
function login(username, password) {
  if (username === "admin" && password === "password") {
    return true;
  } else {
    return false;
  }
}

module.exports = { login };
