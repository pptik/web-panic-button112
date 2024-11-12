import { AuthHeaders } from "../../helpers/AuthHeaders";
import API_ENDPOINT from "../global";
import { userApi } from "../global/config";

const {
  LOGIN,
  REGISTER,
  GET_PROFILE,
  UPDATE_PASSWORD,
  UPDATE_PROFILE,
  FORGOT_PASSWORD,
  UPLOAD_IMAGE,
  ACTIVATE_ACCOUNT,
  GET_COMPANIES,
  GET_USERS,
  DELETE_USERS,
  UPDATE_USERS,
} = API_ENDPOINT;

class UserService {
  static async login(data) {
    const res = await userApi.post(LOGIN, data);
    return res;
  }

  static async register(data) {
    const res = await userApi.post(REGISTER, data);
    return res;
  }

  static async activateAccount(data) {
    const res = await userApi.post(ACTIVATE_ACCOUNT, data);
    return res;
  }

  static async forgotPassword(data) {
    const res = await userApi.post(FORGOT_PASSWORD, data);
    return res;
  }

  static async getProfile() {
    const res = await userApi.get(GET_PROFILE, { headers: AuthHeaders() });
    return res;
  }

  static async updatePassword(data) {
    const res = await userApi.post(UPDATE_PASSWORD, data, {
      headers: AuthHeaders(),
    });
    return res;
  }

  static async updateProfile(data) {
    const res = await userApi.post(UPDATE_PROFILE, data, {
      headers: AuthHeaders(),
    });
    return res;
  }

  static async UploadImage(formdata) {
    const res = await userApi.post(UPLOAD_IMAGE, formdata, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  }

  static async getCompanies() {
    const res = await userApi.get(GET_COMPANIES);
    return res;
  }

  static async getUsersByModule() {
    const res = await userApi.get(GET_USERS, {
      headers: AuthHeaders(),
    });
    return res;
  }

  static async updateUser(guid, data) {
    const res = await userApi.put(UPDATE_USERS(guid), data, {
      headers: AuthHeaders(),
    });
    return res;
  }

  static async deleteUser(guid) {
    const res = await userApi.delete(DELETE_USERS(guid), {
      headers: AuthHeaders(),
    });
    return res;
  }
}

export default UserService;
