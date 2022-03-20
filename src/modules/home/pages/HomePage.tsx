import React, { useState } from 'react';
import { Route, Switch} from 'react-router-dom';
import { ROUTES } from '../../../configs/routes';
import Header from '../components/Home/Header';
import Sidebar from '../components/Home/Sidebar';
import UserPage from './UserPage';
import UserDetails from './UserDetails';
import UserCreate from './UserCreate';
import ProductPage from './ProductPage';
import ProductDetails from './ProductDetails';
import ProductCreate from './ProductCreate';
import '../css/Home.css';

const HomePage = () => {

  const [checked, setChecked] = useState(false)

  return (
    <>
      <input type="checkbox" id="check" readOnly checked={checked} />
      <Header checked={checked} setChecked={setChecked} />
      <Sidebar checked={checked} setChecked={setChecked} />
      <div className="content">

        <div className='content_container'>
          <Switch>
            <Route exact path={ROUTES.user} component={UserPage} />
            <Route exact path={ROUTES.product} component={ProductPage} />
            <Route exact path={`${ROUTES.user_detail}/:id`} component={UserDetails} />
            <Route exact path={`${ROUTES.product_detail}/:id`} component={ProductDetails} />
            <Route exact path={ROUTES.user_create} component={UserCreate}></Route>
            <Route exact path={ROUTES.product_create} component={ProductCreate}></Route>
          </Switch>
        </div>
      </div>
    </>
  )
};

export default HomePage;
