import { AppHeaders } from "../../helpers/AuthHeaders";
import API_ENDPOINT from "../global";
import { appApi } from "../global/config";

const {
  ADD_CASE,
  GET_CASE,
  GET_CASE_BY_ID,
  UPDATE_CASE,
  DELETE_CASE,
  TURN_OFF_CASE,
} = API_ENDPOINT;

class CaseService {
  static async AddCase(data) {
    const res = await appApi.post(ADD_CASE, data, { headers: AppHeaders() });
    return res;
  }

  static async GetCase() {
    const res = await appApi.get(GET_CASE, { headers: AppHeaders() });
    return res;
  }

  static async GetCaseByGuid(guid) {
    const res = await appApi.get(GET_CASE_BY_ID(guid), {
      headers: AppHeaders(),
    });
    return res;
  }

  static async UpdateCase(guid, data) {
    const res = await appApi.put(UPDATE_CASE(guid), data, {
      headers: AppHeaders(),
    });
    return res;
  }

  static async DeleteCase(guid) {
    const res = await appApi.delete(DELETE_CASE(guid), {
      headers: AppHeaders(),
    });
    return res;
  }

  static async TurnOffCase(guid) {
    const res = await appApi.put(TURN_OFF_CASE(guid), {
      headers: AppHeaders(),
    });
    return res;
  }
}

export default CaseService;
