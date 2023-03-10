
import './App.css';
import { useState } from 'react';

function isWebBLEAvailable(){
  if(!navigator.bluetooth){
      console.log("Web Bluetooth is not available.")
      return false
  }
  return true
}

function App() {
  const [sensorReading, setSensorReading] = useState(-1);
  const readingDisplay = sensorReading !== -1 ? <p>{sensorReading}</p> : null;
  
  return (
    <div className="App">
      {readingDisplay}
      <button onClick={connectBluetooth}>
        Connect
      </button>
    </div>
  );
  
  function handleChange(event) {
    setSensorReading(event.target.value.getUint16(0, true))
  }
  function connectBluetooth() {
    if (isWebBLEAvailable()){
      let options = {
        //acceptAllDevices: true,
        filters: [{name: 'Smart Knee Brace'},],
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
        console.log(characteristic)
        return characteristic.startNotifications()
      }).then(characteristic => {
        characteristic.addEventListener('characteristicvaluechanged', handleChange)
      })
    }
  }
}

export default App;
