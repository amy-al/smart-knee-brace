import React, { useState, useEffect, useRef } from "react";
import { FaHome } from "react-icons/fa";
import { Link } from 'react-router-dom';
import "./video.css";

import Stretch_sensor from './stretch_sensor';
import Timer from "./Timer";
import VidDisplay from "./Video_Display";

const videos = [
  { id: 1, src: "https://gfycat.com/ifr/adeptimpurecanadagoose", name: "Video 1" },
  { id: 2, src: "https://gfycat.com/wellinformedscratchydutchsmoushond", name: "Video 2"  },
  { id: 3, src: "https://www.youtube.com/embed/zzoRfu1gzC0", name: "Video 3"  },
  { id: 4, src: "https://www.youtube.com/embed/bvryJd1FqyQ", name: "Video 4"  }
];


export default function VidApp() {
  const [currentIndex, setCurrentIndex] = useState(0);

  /*
  let message;
  if (timer > 0 && paused)
    message = "Click button to start!";
  else if (timer > 0)
    message = "Keep stretching!";
  else
    message = "Stop";
  */

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
        <Stretch_sensor sensor_width="15rem"/>
      </div>

      <div>
        <VidDisplay></VidDisplay>
      </div>



      
    </div>
  </div>
    );
}