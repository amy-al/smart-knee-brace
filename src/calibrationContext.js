import React, { createContext, useState } from 'react';

export const CalibrationContext = createContext();

export const CalibrationProvider = ({ children }) => {
  const [AdjCalibrationValue, setAdjCalibrationValue] = useState(null);
  const [stretchValue, setStretchValue] = useState(-1);
  
  return (
    <CalibrationContext.Provider value={{AdjCalibrationValue, setAdjCalibrationValue, stretchValue, setStretchValue}}>
      {children}
    </CalibrationContext.Provider>
  );
};