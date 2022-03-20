import { replace } from 'connected-react-router';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
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

const LoginPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
