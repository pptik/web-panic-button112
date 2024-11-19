import URL from "./url";

const { USER_URL, API_URL } = URL;

const API_ENDPOINT = {
  LOGIN: `${USER_URL}users/login`,
  REGISTER: `${USER_URL}users/register`,
  ACTIVATE_ACCOUNT: `${USER_URL}users/activate`,
  FORGOT_PASSWORD: `${USER_URL}users/forgot-password`,
  UPDATE_PASSWORD: `${USER_URL}users/edit-password`,
  UPDATE_PROFILE: `${USER_URL}users/edit-profile`,
  UPLOAD_IMAGE: `${USER_URL}images/profile`,
  GET_PROFILE: `${USER_URL}users/profile`,
  GET_COMPANIES: `${USER_URL}companies`,
  GET_USERS: `${USER_URL}users/by-module`,
  UPDATE_USERS: (guid) => `${USER_URL}users/update/${guid}`,
  DELETE_USERS: (guid) => `${USER_URL}users/delete/${guid}`,
  ADD_DEVICE: `${API_URL}device`,
  GET_DEVICE: `${API_URL}device`,
  GET_DEVICE_BY_ID: (guid) => `${API_URL}device/${guid}`,
  UPDATE_DEVICE: (guid) => `${API_URL}device/${guid}`,
  DELETE_DEVICE: (guid) => `${API_URL}device/${guid}`,
  CHANGE_STATUS_DEVICE: (guid, status) => `${API_URL}device/${guid}/${status}`,
  ADD_OPD: `${API_URL}opd`,
  GET_OPD: `${API_URL}opd`,
  GET_OPD_BY_ID: (guid) => `${API_URL}opd/${guid}`,
  UPDATE_OPD: (guid) => `${API_URL}opd/${guid}`,
  DELETE_OPD: (guid) => `${API_URL}opd/${guid}`,
  ADD_CASE: `${API_URL}case`,
  GET_CASE_DONE: `${API_URL}case?status=Selesai`,
  GET_CASE: `${API_URL}case?status=Sedang Terjadi`,
  GET_ALL_CASE: `${API_URL}case`,
  GET_CASE_BY_ID: (guid) => `${API_URL}case/${guid}`,
  UPDATE_CASE: (guid) => `${API_URL}case/${guid}`,
  DELETE_CASE: (guid) => `${API_URL}case/${guid}`,
  TURN_OFF_CASE: (guid) => `${API_URL}case/turn-off-actuator/${guid}`,
  ADD_TRANSACTION: (guid) => `${API_URL}case-trx/${guid}`,
  GET_TRANSACTION: (data) => `${API_URL}case-trx?${data}`,
  CHANGE_STATUS_HANDLING: (guid) => `${API_URL}case-trx/change-status/${guid}`,
  UPDATE_STATUS_DEVICE: (guid, status) => `${API_URL}device/${guid}/${status}`,
  GET_RESPONSE_TIME: (guidCase) => `${API_URL}response-time-opd/${guidCase}/by-case`,
};

export default API_ENDPOINT;
