
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
      acceptAllDevices: true
  }
  console.log("requesting BLE device info...")
  navigator.bluetooth.requestDevice(options).then(device =>{
    device.gatt.connect()
    console.log("Connected to " + device.name)
  }).catch(error=> {
      console.log("Request device error:" + error)
  })
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
