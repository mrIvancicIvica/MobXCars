import { useLocalStore } from 'mobx-react-lite';
import React, { createContext, useContext } from 'react';

import { createCarsStore } from './carsStore';

const CarsContext = createContext(null);

export const CarsProvider = ({ children }) => {
  const carsStore = useLocalStore(createCarsStore);

  return (
    <CarsContext.Provider value={carsStore}>{children}</CarsContext.Provider>
  );
};

export const useCarsStore = () => useContext(CarsContext);
