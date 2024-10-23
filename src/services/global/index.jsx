import URL from "./url";

const { USER_URL, API_URL } = URL;

const API_ENDPOINT = {
  LOGIN: `${USER_URL}users/login`,
  SIGNUP: `${USER_URL}users/register`,
  REGISTER: `${USER_URL}users/add`,
  ACTIVATE_ACCOUNT: `${USER_URL}users/activate`,
  FORGOT_PASSWORD: `${USER_URL}users/forgot-password`,
  UPDATE_PASSWORD: `${USER_URL}users/edit-password`,
  UPDATE_PROFILE: `${USER_URL}users/edit-profile`,
  UPLOAD_IMAGE: `${USER_URL}images/profile`,
  GET_PROFILE: `${USER_URL}users/profile`,
  GET_COMPANIES: `${USER_URL}companies`,
  GET_USERS: `${USER_URL}users/by-module`,
};

export default API_ENDPOINT;
