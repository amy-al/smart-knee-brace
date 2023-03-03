
import './App.css';

function isWebBLEAvailable(){
  if(!navigator.bluetooth){
      console.log("Web Bluetooth is not available.")
      return false
  }
  return true
}

function connectBluetooth(){
  if(isWebBLEAvailable()){
    let options = {
      filters: [{name: 'Adafruit Bluefruit LE'}, { services: ["c48e6067-5295-48d3-8d5c-0395f61792b1"] },],
      optionalServices: ["battery_service"],
      // acceptAllDevices: true
    }
    console.log("requesting BLE device info...")
    navigator.bluetooth.requestDevice(options).then(device =>{
      device.gatt.connect()
      console.log("Connected to " + device.name)
      console.log("UUID: " + device.gatt.uuid) // seems that uuid has not been set
      console.log("Service options: " + device.gatt.getPrimaryServices("6e400001-b5a3-f393-e0a9-e50e24dcca9e"))
    }).then(server => {
      // Getting Battery Service…
      return server.getPrimaryService('battery_service');
    })
    .then(service => {
      // Getting Battery Level Characteristic…
      return service.getCharacteristic('battery_level');
    })
    .then(characteristic => {
      // Reading Battery Level…
      return characteristic.readValue();
    })
    .then(value => {
      console.log(`Battery percentage is ${value.getUint8(0)}`);
    })
    .catch(error => { console.error(error); });
  }
}

// set up event listeners


function App() {
  return (
    <div className="App">
      <button onClick={connectBluetooth}>
        Connect
      </button>
    </div>
  );
}

export default App;
