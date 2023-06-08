
/// not used a rn

import React, { createContext, useState } from 'react';

export const StretchContext = createContext();

export const StretchProvider = ({ children }) => {
  const [stretchValue, setStretchValue] = useState(null);

  return (
    <StretchContext.Provider value={{stretchValue, setStretchValue}}>
      {children}
    </StretchContext.Provider>
  );
};