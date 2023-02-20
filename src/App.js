import logo from './logo.svg';
import './App.css';

function isWebBLEAvailable(){
  if(!navigator.bluetooth){
      console.log("Web Bluetooth is not available.")
      return false
  }
  return true
}

function getDeviceInfo(){
  let options = {
      acceptAllDevices: true
  }
  console.log("requesting BLE device info...")
  navigator.bluetooth.requestDevice(options).then(device =>{
      console.log("Bluetooth device connected:" + device)
  }).catch(error=> {
      console.log("Request device error:" + error)
  })
}

function connectToBluetooth(){
    if(isWebBLEAvailable()){
      getDeviceInfo()
    }
}

function App() {
  return (
    <div className="App">
      <button onClick={connectToBluetooth}>
        Connect with the Flora BLE.
      </button>
    </div>
  );
}

export default App;
