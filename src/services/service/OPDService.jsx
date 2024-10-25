import { AppHeaders } from "../../helpers/AuthHeaders";
import API_ENDPOINT from "../global";
import { appApi } from "../global/config";

const {
  ADD_OPD,
  GET_OPD,
  GET_OPD_BY_ID,
  UPDATE_OPD,
  DELETE_OPD,
} = API_ENDPOINT;

class OPDService {
  static async AddOPD(data) {
    const res = await appApi.post(ADD_OPD, data, { headers: AppHeaders() });
    return res;
  }

  static async GetOPD() {
    const res = await appApi.get(GET_OPD, { headers: AppHeaders() });
    return res;
  }

  static async GetOPDByGuid(guid) {
    const res = await appApi.get(GET_OPD_BY_ID(guid), {
      headers: AppHeaders(),
    });
    return res;
  }

  static async UpdateOPD(guid, data) {
    const res = await appApi.put(UPDATE_OPD(guid), data, {
      headers: AppHeaders(),
    });
    return res;
  }

  static async DeleteOPD(guid) {
    const res = await appApi.delete(DELETE_OPD(guid), {
      headers: AppHeaders(),
    });
    return res;
  }
}

export default OPDService;
