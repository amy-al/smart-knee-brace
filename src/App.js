
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
      acceptAllDevices: true,
      //filters: [{name: 'Smart Knee Brace'},],
      optionalServices: ["6e400001-b5a3-f393-e0a9-e50e24dcca9e"], // 59f5bf56-803a-4525-8202-1284c6d0f073
    }
    console.log("requesting BLE device info...")
    navigator.bluetooth.requestDevice(options).then(device =>{
      device.gatt.connect().then(server =>{
        console.log(server)
        console.log("Connected to " + server.device.name)
        console.log("UUID: " + server.device.id) // seems that uuid has not been set
        server.getPrimaryServices("6e400001-b5a3-f393-e0a9-e50e24dcca9e").then(services =>{
          console.log(services)
          console.log(typeof services)
          services[0].getCharacteristic("6e400002-b5a3-f393-e0a9-e50e24dcca9e").then(characteristic =>{
            console.log(characteristic)
            characteristic.startNotifications()
            characteristic.addEventListener("characteristicvaluechanged", handleChange);
            // characteristic.readValue().then(value =>{
            //   console.log(`message is: ${value.getUint8(0)}`)
            // })
          })
        })
      })
    })
  }
}

// set up event listeners
function handleChange(event){
  const val = event.target.value.getUint8(0);
  console.log("value is" + val);
}


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
