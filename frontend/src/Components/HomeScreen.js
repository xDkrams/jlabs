import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HomeScreen.css";

const HomeScreen = () => {
  const [ipInfo, setIpInfo] = useState(null);
  const [searchIp, setSearchIp] = useState("");
  const [error, setError] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // fetch Ip
  const fetchIpInfo = async () => {
    try {
      const ipResponse = await axios.get("https://api.ipify.org?format=json");
      const { ip } = ipResponse.data;

      const geoResponse = await axios.get(`https://ipapi.co/${ip}/json/`);
      setIpInfo(geoResponse.data);
    } catch (error) {
      console.error("Error fetching IP info:", error);
    }
  };

  const searchGeoInfo = async () => {
    if (!searchIp) {
      setError("Please enter a valid IP address.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:3000/api/home/${searchIp}/geo`
      );
      setIpInfo(response.data);
      setError("");

      // Update search history
      setSearchHistory([...searchHistory, searchIp]);
    } catch (error) {
      console.error("Error fetching IP info:", error);
      setError("Invalid IP address or IP address not found.");
    }
  };

  // Function to handle clearing search
  const clearSearch = () => {
    setSearchIp("");
    setError("");
    fetchIpInfo();
  };

  useEffect(() => {
    fetchIpInfo();
  }, []);

  return (
    <div className="container">
      <div className="search-container">
        <div className="search-input">
          <input
            type="text"
            value={searchIp}
            onChange={(e) => setSearchIp(e.target.value)}
            placeholder="Enter IP address"
          />
        </div>
        <div className="search-buttons">
          <button onClick={searchGeoInfo}>Search</button>
          <button onClick={clearSearch}>Clear Search</button>
        </div>
      </div>
      <div
        className="error-message"
        style={{ visibility: error ? "visible" : "hidden" }}
      >
        {error}
      </div>

      <div className="ip-Cont">
        <div className="ip-info">
          <h2>IP Information</h2>
          <p>
            <strong>IP:</strong> {ipInfo?.ip}
          </p>
          <p>
            <strong>Country:</strong> {ipInfo?.country}
          </p>
          <p>
            <strong>City:</strong> {ipInfo?.city}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
