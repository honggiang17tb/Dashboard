import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import { Routes } from './Routes';

import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { API_PROJECT } from './configs/api';
import { AppState } from './redux/reducer';
import { fetchThunk } from './modules/common/redux/thunk';
import { setPayload } from './modules/home/redux/payloadReducer';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'



function App() {

  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [data, setData] = useState<any>({})

  const getData = async () => {
    const brand = await dispatch(fetchThunk(API_PROJECT.brands, 'get'));
    setData((prev: any) => {
      return { ...prev, brand: brand.data }
    })
    const category = await dispatch(fetchThunk(API_PROJECT.categories, 'get'));
    setData((prev: any) => {
      return { ...prev, category: category.data }
    })

    const country = await dispatch(fetchThunk(API_PROJECT.country, 'get'));
    setData((prev: any) => {
      return { ...prev, country: country.data }
    })

    const vendor = await dispatch(fetchThunk(API_PROJECT.vendor, 'get'));
    setData((prev: any) => {
      return { ...prev, vendor: vendor.data }
    })

    const shipping = await dispatch(fetchThunk(API_PROJECT.shipping, 'get'));
    setData((prev: any) => {
      return { ...prev, shipping: shipping.data }
    })


  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    dispatch(setPayload(data))
  }, [data])


  return (
    <>
      <ToastContainer />
      <Routes />
    </>

  );
}

export default App;
