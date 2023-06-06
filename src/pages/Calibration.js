import React, { useState, useEffect } from 'react';
import './Calibration.css';

const Calibration = ({stretch_value, onCalibrationValue}) => {
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

    const currentValue = stretch_value; /* Retrieve the current knee brace value */
    setCalibrationValue(currentValue);

    if (countdown === 0) {
      onCalibrationValue(currentValue);
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
    <div className="calibration-container">
      <h2>Calibration</h2>
      {countdown === 0 ? (
        <div>
          <p className="calibration-value">Calibration value: {calibrationValue}</p>
          <button className="reset-timer" onClick={handleResetTimer}>
            Reset
          </button>
        </div>
      ) : (
        <div>
          <p>Extend your knee as the countdown timer runs:</p>
          <div className="timer">{countdown}</div>
          {countdown != 10 && <p className="calibration-value">Calibration value: {calibrationValue}</p>}
        </div>
      )}
      {countdown === 10 && (
        <button className="start-timer" onClick={handleStartTimer}>
          Start
        </button>
      )}
    </div>
  );
};

export default Calibration;

