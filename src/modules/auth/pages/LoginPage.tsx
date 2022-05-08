import React, { useState } from 'react';
import { replace } from 'connected-react-router';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { API_PROJECT } from '../../../configs/api';
import { ROUTES } from '../../../configs/routes';
import { ILoginParams } from '../../../models/auth';
import { AppState } from '../../../redux/reducer';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { fetchThunk } from '../../common/redux/thunk';
import LoginForm from '../components/LoginForm';
import { setUserInfo } from '../redux/authReducer';
import { setPayload } from '../../home/redux/payloadReducer';


const LoginPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const getData = async () => {
    const brand = dispatch(fetchThunk(API_PROJECT.brands, 'get'));
    const category = dispatch(fetchThunk(API_PROJECT.categories, 'get'));
    const country = dispatch(fetchThunk(API_PROJECT.country, 'get'));
    const vendor = dispatch(fetchThunk(API_PROJECT.vendor, 'get'));
    const shipping = dispatch(fetchThunk(API_PROJECT.shipping, 'get')); 

    const a = await Promise.all([brand,category,country,vendor,shipping])
    const b = {
      brand:a[0].data,
      category:a[1].data,
      country:a[2].data,
      vendor:a[3].data,
      shipping:a[4].data,

    }
    dispatch(setPayload(b))
  }


  const onLogin = React.useCallback(
    async (values: ILoginParams) => {
      setErrorMessage('');
      setLoading(true);

      const json = await dispatch(
        fetchThunk(API_PROJECT.login, 'post', { email: values.email, password: values.password }),
      );

      setLoading(false);

      if (json?.success) {
        dispatch(setUserInfo({
          user: json.user,
          user_cookie: json.user_cookie
        }));
        Cookies.set(ACCESS_TOKEN_KEY, json.user_cookie, { expires: 7 });
        dispatch(replace(ROUTES.user));
        getData()
        return;
      }

      setErrorMessage(json.errors.email);
    },
    [dispatch],
  );

  return (
    <div
      className="container"
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',

      }}
    >
      <LoginForm onLogin={onLogin} loading={loading} errorMessage={errorMessage} />

    </div>
  );
};

export default LoginPage;
