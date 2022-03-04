import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom'
import '../components/Style.css'

import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import UserPage from './UserPage';
import ProductPage from './ProductPage';

interface Props {

}

const HomePage = (props: Props) => {
  const [checked, setChecked] = useState(false)

  return (
    <>
      <input type="checkbox" id="check" checked={checked} />
      <Header checked={checked} setChecked={setChecked} />
      <Sidebar checked={checked} setChecked={setChecked}></Sidebar>
      <div className="content">
        <Switch>
          <Route exact path='/home/pages/userlist' component={UserPage} />
          <Route exact path='/home/pages/products' component={ProductPage} />
        </Switch>
      </div>
    </>
  )
};

export default HomePage;
