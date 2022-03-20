import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { IUser } from '../../../models/user';

export interface AuthState {
  user?: IUser;
  user_cookie?:string,
}

export const setUserInfo = createCustomAction('auth/setUserInfo', (data: AuthState) => ({
  data,
}));
export const logOut = createCustomAction('auth/logOut', (data: AuthState) => ({
  data,
}));

const actions = { setUserInfo, logOut };

type Action = ActionType<typeof actions>;

export default function reducer(state: AuthState = {}, action: Action) {
  switch (action.type) {

    case getType(setUserInfo):
      return {
        ...state,
        user: action.data.user,
        isAuthenticated: true,
        user_cookie: action.data.user_cookie,
      };
    case getType(logOut):
      return {}
    default:
      return state;
  }
}
