import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Stretch_sensor from './pages/stretch_sensor';
  
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
        </Routes>
        </Router>
    </>
);
}
  
export default App;