import React, { useState, useEffect } from 'react';
import './Calibration.css';
import Stretch_sensor from './stretch_sensor';
import { FaHome } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Calibration = () => {
  const [countdown, setCountdown] = useState(10); // Countdown timer value
  const [calibrationValue, setCalibrationValue] = useState(null); // Store fully extended value
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    let timer;

    // Logic to handle countdown timer
    if (!paused && countdown !== 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    const currentValue = localStorage.getItem("sensorValue"); /* Retrieve the current knee brace value */
    setCalibrationValue(currentValue);
    console.log("currentValue", currentValue)

    if (countdown === 0) {
      localStorage.setItem("calibrationValue", currentValue)
      console.log("CURRENTVALUE", currentValue)
    }

    // Cleanup timer when component unmounts
    return () => clearInterval(timer);
  }, [countdown, paused]);

  const handleStartTimer = () => {
    setPaused(false);
  };

  const handleResetTimer = () => {
    setCountdown(10);
    setPaused(true);
    setCalibrationValue(null); // Reset the calibration value
  };

  return (
    <div>
        <div className="navbar">
          <Link className="home-button"
                tabIndex={-1}
                to="/"
          >
            <FaHome />
          </Link>
      </div>
      <h1 className="calibration-title">Calibration</h1>
      <div className="horizontal-container">
          <div className='stretch-sensor-container'>
            <Stretch_sensor sensor_width='25em'/>
          </div>
          <div className="calibration-container">
            {countdown === 0 ? (
              <div>
                <p className="calibration-value">Calibration value: {calibrationValue}</p>
                <button className="reset-timer" onClick={handleResetTimer}>
                  Reset
                </button>
              </div>
            ) : (
              <div>
                {countdown != 10 && <p className="large-text">Stretch Your Knee As Far As You Can!</p>}
                {countdown != 10 && <div className="timer">{countdown}</div>}
              </div>
            )}
            {countdown === 10 && (
              <button className="calibrate-button" onClick={handleStartTimer}>
                Calibrate!
              </button>
            )}
          </div>
      </div>
    </div>
  );
};

export default Calibration;

