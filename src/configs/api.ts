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

const baseURL  = 'https://api.gearfocus.div4.pgtest.co'

export const API_PROJECT = {
  login : `${baseURL}/api/authentication/login`,
  categories : `${baseURL}/api/categories/list`,
  brands : `${baseURL}/apiAdmin/brands/list`,
  country : `${baseURL}/apiAdmin/commons/country`,
  state:`${baseURL}/apiAdmin/commons/state`,
  vendor : `${baseURL}/apiAdmin/vendors/list`,
  shipping:`${baseURL}/apiAdmin/shipping/list`,
  condition:`${baseURL}/apiAdmin/conditions/list`,
  upload_image:`${baseURL}/api/products/upload-image`,

  userList : `${baseURL}/apiAdmin/users/list`,
  userCreate:`${baseURL}/apiAdmin/users/create`,
  userDetails:`${baseURL}/apiVendor/profile/detail`,
  userUpdate:`${baseURL}/apiAdmin/users/edit`,
  userDelete:`${baseURL}/apiAdmin/users/edit`,

  productList:`${baseURL}/api/products/list`,
  productDetails:`${baseURL}/apiAdmin/products/detail`,
  productCreate:`${baseURL}/apiAdmin/products/create`,
  productUpdate:`${baseURL}/apiAdmin/products/create`,
  productDelete:`${baseURL}/apiAdmin/products/edit`,
  productEdit:`${baseURL}/apiAdmin/products/edit`,

}
