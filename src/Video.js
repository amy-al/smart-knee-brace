import React, { useState, useEffect, useRef } from "react";
import "./video.css";

const videos = [
  { id: 1, src: "https://www.youtube.com/embed/eKvSkbB2wu0" },
  { id: 2, src: "https://www.youtube.com/embed/ikt6NME0k9E" },
  { id: 3, src: "https://www.youtube.com/embed/zzoRfu1gzC0" },
  { id: 4, src: "https://www.youtube.com/embed/bvryJd1FqyQ" }
];

const INTERVAL = 5000; // in milliseconds

export default function VidApp() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timer, setTimer] = useState(INTERVAL / 1000);
  const timerRef = useRef();

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimer((timer) => timer - 0.1);
    }, 100);

    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (timer < 0) {
      setTimer(INTERVAL / 1000);
      setCurrentIndex((currentIndex) => (currentIndex + 1) % videos.length);
    }
  }, [timer]);

  const handleResetTimer = () => {
    setTimer(INTERVAL / 1000);
  };

  const activeVideo = videos[currentIndex];

  return (
    <div className="container">
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
      <div className="tagline">Keep Stretching</div>
      <button className="reset-timer" onClick={handleResetTimer}>
        Reset Timer
      </button>
    </div>
  </div>
    );
}