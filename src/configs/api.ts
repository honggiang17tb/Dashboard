import { APIHost } from '../utils/constants';

enum APIService {
  auth,
  protected,
  public,
}

function getBaseUrl(service: APIService) {
  if (service === APIService.auth) {
    return `${APIHost}/auth`;
  } else if (service === APIService.protected) {
    return `${APIHost}/protected`;
  } else if (service === APIService.public) {
    return `${APIHost}`;
  }

  return '';
}

export const API_PATHS = {
  signIn: `${getBaseUrl(APIService.auth)}/login`,
  userProfile: `${getBaseUrl(APIService.public)}/user`,
};

export const API_PROJECT = {
  login : `https://api.gearfocus.div4.pgtest.co/api/authentication/login`,
  categories : `https://api.gearfocus.div4.pgtest.co/api/categories/list`,
  brands : `https://api.gearfocus.div4.pgtest.co/apiAdmin/brands/list`,
  userList : `https://api.gearfocus.div4.pgtest.co/apiAdmin/users/list`
}
