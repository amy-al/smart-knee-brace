import React, { useState, useEffect, useRef } from "react";
import { FaHome } from "react-icons/fa";
import { Link } from 'react-router-dom';
import "./video.css";

import Stretch_sensor from './stretch_sensor';
import Timer from "./Timer";

const videos = [
  { id: 1, src: "https://gfycat.com/ifr/briskblindcirriped", name: "Video 1" },
  { id: 2, src: "https://gfycat.com/ifr/littlegrippinggavial", name: "Video 2"  },
  { id: 3, src: "https://gfycat.com/ifr/wideevengull", name: "Video 3"  },
  { id: 4, src: "https://gfycat.com/ifr/amazinghollowhedgehog", name: "Video 4"  }
];


export default function VidDisplay() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const activeVideo = videos[currentIndex];
  var previousVideo = videos[currentIndex - 1];
  var nextVideo = videos[(currentIndex + 1) % videos.length];

  if(currentIndex == 0){
    previousVideo = videos[videos.length - 1];
  }

  function NextVideo(done){
    if(done)
      setCurrentIndex((currentIndex) => (currentIndex + 1) % videos.length);
  }


  return (
    <div>

      <div className="container">

      <Timer handleCallback={NextVideo}></Timer>

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
