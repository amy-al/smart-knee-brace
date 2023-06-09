
import '../App.css';
import './stretch_sensor.css'
import { useState, useEffect } from 'react';

// import GaugeChart from 'react-gauge-chart';
import StretchingInterface from '../stretch.js';

import React from "react"
import { arc } from "d3-shape"
import { scaleLinear } from "d3-scale"
import { format } from "d3-format"

import Calibration from './Calibration';



function isWebBLEAvailable(){
  if(!navigator.bluetooth){
      console.log("Web Bluetooth is not available.")
      return false
  }
  return true
}



function Stretch_sensor({ sensor_width = "9em", height = "auto" }) {
  const [sensorReading, setSensorReading] = useState(-1);
  const readingDisplay = sensorReading !== null ? <p>{sensorReading}</p> : -1;
  console.log("readingDisplay", readingDisplay)

  const calibrationValue = localStorage.getItem("calibrationValue")
  var adjustedcalibrationValue = 1

  if (calibrationValue !== "null"){
    adjustedcalibrationValue = calibrationValue
  }

  console.log("Calibration Value", adjustedcalibrationValue)

// Gauge
const Gauge = ({
  //max_value = localStorage.getItem('CalibrationValue'),
  //ajusted_max_value = max_value !== null ? max_value : 10,
  value=(sensorReading / adjustedcalibrationValue).toFixed(2),
  min=0,
  max=1,
  label="Stretch Reading",
  units="Inches",
}) => {

  console.log("Value", value)
  console.log("Sensor Reading", sensorReading)
  console.log("Calibration Value", adjustedcalibrationValue)
  const backgroundArc = arc()
    .innerRadius(0.65)
    .outerRadius(1)
    .startAngle(-Math.PI / 2)
    .endAngle(Math.PI / 2)
    .cornerRadius(1)
    ()

  const percentScale = scaleLinear()
    .domain([min, max])
    .range([0, 1])
  const percent = percentScale(value)
  // console.log("percent", percent);

  const angleScale = scaleLinear()
    .domain([0, 1])
    .range([-Math.PI / 2, Math.PI / 2])
    .clamp(true)

  const angle = angleScale(percent)
  // console.log("angle", angle);

  const [targetAngle, setTargetAngle] = useState(0);

  useEffect(() => {

    let moveRight = true;
    const interval = setInterval(() => {

      if(targetAngle == 1){
        moveRight = false; 
      }

      if(targetAngle == 0){
        moveRight = true; 
      }

      if(moveRight){
        setTargetAngle(targetAngle + 1)
      }
      else {
        setTargetAngle(targetAngle - 1)
      }

    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [targetAngle]);

  const filledArc = arc()
    .innerRadius(0.65)
    .outerRadius(1)
    .startAngle(-Math.PI / 2)
    .endAngle(angle)
    .cornerRadius(1)
    ()

  const colorScale = scaleLinear()
    .domain([0, 1])
    .range(["#dbdbe7", "#4834d4"])

  const gradientSteps = colorScale.ticks(10)
    .map(value => colorScale(value))

  const markerLocation = getCoordsOnArc(
    angle,
    1 - ((1 - 0.65) / 2),
  )
  const targetLocation = getCoordsOnArc(
    targetAngle,
    1 - ((1 - 0.65) / 2), 
  )

  return (
    <div
      style={{
        textAlign: "center",
      }}>
      <svg style={{overflow: "visible"}}
        width={sensor_width}
        viewBox={[
          -1, -1,
          2, 1,
        ].join(" ")}>
        <defs>
          <linearGradient
            id="Gauge__gradient"
            gradientUnits="userSpaceOnUse"
            x1="-1"
            x2="1"
            y2="0">
            {gradientSteps.map((color, index) => (
              <stop
                key={color}
                stopColor={color}
                offset={`${
                  index
                  / (gradientSteps.length - 1)
                }`}
              />
            ))}
          </linearGradient>
        </defs>
        <path
          d={backgroundArc}
          fill="#dbdbe7"
        />
        <path
          d={filledArc}
          fill="url(#Gauge__gradient)"
        />
        <line
          y1="-1"
          y2="-0.65"
          stroke="white"
          strokeWidth="0.027"
        />
        <circle
          cx={markerLocation[0]}
          cy={markerLocation[1]}
          r="0.2"
          stroke="#2c3e50"
          strokeWidth="0.01"
          fill={colorScale(percent)}
        />
        <circle
          cx={targetLocation[0]}
          cy={targetLocation[1]}
          r="0.2"
          stroke="#2c3e50"
          strokeWidth="0.01"
          fill={colorScale(.1)}
        />
        <path
          d="M0.136364 0.0290102C0.158279 -0.0096701 0.219156 -0.00967009 0.241071 0.0290102C0.297078 0.120023 0.375 0.263367 0.375 0.324801C0.375 0.422639 0.292208 0.5 0.1875 0.5C0.0852272 0.5 -1.8346e-08 0.422639 -9.79274e-09 0.324801C0.00243506 0.263367 0.0803571 0.120023 0.136364 0.0290102ZM0.1875 0.381684C0.221591 0.381684 0.248377 0.356655 0.248377 0.324801C0.248377 0.292947 0.221591 0.267918 0.1875 0.267918C0.153409 0.267918 0.126623 0.292947 0.126623 0.324801C0.126623 0.356655 0.155844 0.381684 0.1875 0.381684Z"
          transform={`rotate(${
            angle * (180 / Math.PI)
          }) translate(-0.2, -0.33)`}
          fill="#6a6a85"
        />
      </svg>

      <div style={{
        marginTop: "1em",
        fontSize: "3em",
        lineHeight: "1em",
        fontWeight: "900",
        fontFeatureSettings: "'zero', 'tnum' 1",
      }}>
        { format(",")(value) }
      </div>

      {!!label && (
        <div style={{
          color: "#8b8ba7",
          marginTop: "0.6em",
          fontSize: "1.3em",
          lineHeight: "1.3em",
          fontWeight: "700",
        }}>
          { label }
        </div>
      )}

      {!!units && (
        <div style={{
          color: "#8b8ba7",
          lineHeight: "1.3em",
          fontWeight: "300",
        }}>
          { units }
        </div>
      )}
    </div>
  )
}

const getCoordsOnArc = (angle, offset=10) => [
  Math.cos(angle - (Math.PI / 2)) * offset,
  Math.sin(angle - (Math.PI / 2)) * offset,
]

// const handleCalibrationValue = (value) => {
//   setCalibrationValue(value);
// };

// end of gauge
  // does classname matter here?
  return (
    <div className="App"> 
      <button className='connect-button' onClick={connectBluetooth}>
        Connect
      </button>
      <div>
        < Gauge>
        </Gauge>
      </div>
    </div>
  );
  
  function handleChange(event) {
    const reading = event.target.value.getUint16(0, true)
    const voltage = reading / 1023.0 * 3.3
    const resistance = (voltage * 1000) / (3.3 - voltage)
    const length = resistance / 350.0 
    setSensorReading(length.toFixed(2))
    localStorage.setItem("sensorValue", length.toFixed(2));
  }

  function connectBluetooth() {
    if (isWebBLEAvailable()){
      let options = {
        acceptAllDevices: true,
        // filters: [{name: 'Smart Knee Brace'},],
        optionalServices: [
          "6e400001-b5a3-f393-e0a9-e50e24dcca9e",
          "59f5bf56-803a-4525-8202-1284c6d0f073"], // 59f5bf56-803a-4525-8202-1284c6d0f073
      }
      console.log("requesting BLE device info...")
      navigator.bluetooth.requestDevice(options).then(device =>{
        return device.gatt.connect()
      }).then(server => {
        return server.getPrimaryServices("59f5bf56-803a-4525-8202-1284c6d0f073")
      }).then(services => {
        return services[0].getCharacteristic(0x0002)
      }).then(characteristic => {
        console.log("characteristic", characteristic)
        return characteristic.startNotifications()
      }).then(characteristic => {
        characteristic.addEventListener('characteristicvaluechanged', handleChange)
      })
    }
  }
}

export default Stretch_sensor;
