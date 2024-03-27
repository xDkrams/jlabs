import React, { useState } from "react";
import axios from "axios"; // Import Axios
import "./Login.css";

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        username: username,
        password: password,
      });

      if (response.status === 200) {
        setIsLoggedIn(true);
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      console.error("Error:", error.message);
      setError("An error occurred during login");
    }
  };

  return (
    <div className="container">
      <div className="LogCont">
        <h2>Login</h2>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleLogin}>Login</button>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </div>
    </div>
  );
};

export default Login;
