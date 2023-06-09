import React, { useState, useEffect, useRef } from "react";
import "./video.css";

const INTERVAL =5000; // in milliseconds

export default function Timer(props) {

    const [timer, setTimer] = useState(INTERVAL / 1000);
    const [paused, setPaused] = useState(true);
    const timerRef = useRef();

    
  useEffect(() => {
    if (!paused) {
      timerRef.current = setInterval(() => {
        setTimer((timer) => timer - 0.1);
      }, 100);
    }

    return () => clearInterval(timerRef.current);
  }, [paused]);

  useEffect(() => {
    if (timer < 0) {
      setTimer(INTERVAL / 1000);
      setPaused(true);
      {props.handleCallback(true)}
    }
  }, [timer]);


  const handleResetTimer = () => {
    setTimer(INTERVAL / 1000);
  };

  const handleStartTimer = () => {
    setPaused(false);
  };


  return (
    <div className="timer-container">
    <div className="timer">{timer.toFixed(1)}</div>
    {paused ? (
        <button className="start-timer" onClick={handleStartTimer}>
          Start
        </button>
      ) : (
        <button className="reset-timer" onClick={handleResetTimer}>
          Reset Timer
        </button>
      )}
  </div>
  )

}