import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Stretch_sensor from './pages/stretch_sensor';
import Video from './pages/Video'
import Calibration from './pages/Calibration';
  
function App() {
return (
    <>
        <Router>
            <Routes>
            {/* This route is for home component 
            with exact path "/", in component props 
            we pass the imported component*/}
            <Route exact path="/" element={<Home />}></Route>
            <Route path="/stretch" element={<Stretch_sensor />}></Route>
            <Route path="/video" element={<Video />}></Route>
            <Route path="/calibration" element={<Calibration />}></Route>
        </Routes>
        </Router>
    </>
);
}
  
export default App;