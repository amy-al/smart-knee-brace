
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

const val = localStorage.getItem("sensorValue");
console.log(val)

const customStyles = {
  control: (provided) => ({
    ...provided,
    fontSize: '1.5rem',
    minHeight: '50px',
    width: '50vh'
  }),
};

const DropdownMenu = () => (
  <Select options={options} styles={customStyles}/>
)

const handleClick = () => {
  window.location.href = '/Video';
};

  
const Home = () => {
  return (
    <div>
      <div className="navbar">
      <Link className="home-button"
            tabIndex={-1}
            to="/"
      >
      </Link>
    </div>
      <div className="main-page">
        <h1>Welcome to your Smart Knee Brace!</h1>
        <h2>Select your knee injury:</h2>
          <DropdownMenu/>
        <br />
        <ul>
          <button className='button-style'>
            {/* Endpoint to route to About component */}
            <Link className="button-style" to="/video">Excercises</Link>
          </button>
          <button className='button-style'>
            {/* Endpoint to route to About component */}
            <Link className="button-style" to="/calibration">Calibrate</Link>
          </button>
        </ul>
      </div>
    </div>
  );
};
  
export default Home;