
import React from "react";
// importing Link from react-router-dom to navigate to 
// different end points.
import { Link } from "react-router-dom";
  
const Home = () => {
  return (
    <div>
      <h1>Welcome to your Smart Knee Brace!</h1>
      <br />
      <ul>
        <li>
          {/* Endpoint to route to Home component */}
          <Link to="/">Home</Link>
        </li>
        <li>
          {/* Endpoint to route to About component */}
          <Link to="/stretch">Stretch Sensor Reading</Link>
        </li>
        <li>
          {/* Endpoint to route to About component */}
          <Link to="/video">Video With Timer</Link>
        </li>
      </ul>
    </div>
  );
};
  
export default Home;