
import React, {useState} from "react";
// importing Link from react-router-dom to navigate to 
// different end points.
import { Link } from "react-router-dom";

import Select from 'react-select'
import './home.css';


const options = [
  { value: 'acl', label: 'ACL injury' },
  { value: 'pcl', label: 'PCL injury' },
  { value: 'sprain', label: 'Sprain' },
  { value: 'meniscal', label: 'Meniscal tear'},
  { value: 'tendon', label: 'Tendon tear'},
  { value: 'collateral', label: 'Collateral ligament injuries'},
  { value: 'general', label: 'General knee pain'},
  { value: 'other', label: 'Other'}
]

// const [selectedOption, setSelectedOption] = useState(null); // use the selected option and change the state

const DropdownMenu = () => (
  <Select options={options} />
)

  
const Home = () => {
  return (
    <div className="main-page">
      <h1>Welcome to your Smart Knee Brace!</h1>
      <h2>Select your knee injury:</h2>
      <DropdownMenu/>
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
        <li>
          {/* Endpoint to route to About component */}
          <Link to="/calibration">Calibrate</Link>
        </li>
      </ul>
    </div>
  );
};
  
export default Home;