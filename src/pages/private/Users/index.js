import React from 'react';
import {Switch, Route} from 'react-router-dom';
import User from '../User';

const Product = () => {
  return (
    <Switch>
      <Route component={User} />
    </Switch>
  );
};
export default Product;
