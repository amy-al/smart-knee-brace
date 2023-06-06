import React, { useState, useEffect, useRef } from "react";
import { FaHome } from "react-icons/fa";
import { Link } from 'react-router-dom';
import "./video.css";

import Stretch_sensor from './stretch_sensor';

const videos = [
  { id: 1, src: "https://gfycat.com/ifr/adeptimpurecanadagoose", name: "Video 1" },
  { id: 2, src: "https://www.youtube.com/embed/ikt6NME0k9E", name: "Video 2"  },
  { id: 3, src: "https://www.youtube.com/embed/zzoRfu1gzC0", name: "Video 3"  },
  { id: 4, src: "https://www.youtube.com/embed/bvryJd1FqyQ", name: "Video 4"  }
];

const INTERVAL =30000; // in milliseconds

export default function VidApp() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timer, setTimer] = useState(INTERVAL / 1000);
  const [paused, setPaused] = useState(true);
  const timerRef = useRef();

  /*
  let message;
  if (timer > 0 && paused)
    message = "Click button to start!";
  else if (timer > 0)
    message = "Keep stretching!";
  else
    message = "Stop";
  */

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
      setCurrentIndex((currentIndex) => (currentIndex + 1) % videos.length);
      setPaused(true);
    }
  }, [timer]);

  const handleResetTimer = () => {
    setTimer(INTERVAL / 1000);
  };

  const handleStartTimer = () => {
    setPaused(false);
  };

  const activeVideo = videos[currentIndex];
  var previousVideo = videos[currentIndex - 1];
  var nextVideo = videos[(currentIndex + 1) % videos.length];

  if(currentIndex == 0){
    previousVideo = videos[videos.length - 1];
  }


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

      <div className="container">
     
      <div className="gauge">
        <Stretch_sensor/>
      </div>


      <div className="video-top">
        <div className="previous-video">{previousVideo.name}</div>
        <div className="title">{activeVideo.name}</div>
        <div className="next-video">{nextVideo.name}</div>
      </div>

      <div className="video-container">
        <iframe
          key={activeVideo.id}
          title={`video-${activeVideo.id}`}
          src={activeVideo.src}
          frameBorder="0"
          allowFullScreen
        />
      </div>

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
      <div className="navigation-container">
        <button
          className="previous-button"
          onClick={() => setCurrentIndex((currentIndex - 1 + videos.length) % videos.length)}
        >
          Previous
        </button>
        <button
          className="next-button"
          onClick={() => setCurrentIndex((currentIndex + 1) % videos.length)}
        >
          Next
        </button>
      </div>
    </div>
  </div>
    );
}