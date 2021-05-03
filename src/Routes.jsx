import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AddNewCar from './components/AddNewCar';

import Header from './components/Header';
import ListOfCars from './components/ListOfCars';

const Routes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path='/' component={ListOfCars} exact />
        <Route path='/newcar' component={AddNewCar} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
