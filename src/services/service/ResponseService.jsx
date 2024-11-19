import { AppHeaders } from "../../helpers/AuthHeaders";
import API_ENDPOINT from "../global";
import { appApi } from "../global/config";

const { GET_RESPONSE_TIME } = API_ENDPOINT;

class ResponseService {
  static async getResponseTime(guid) {
    const res = await appApi.get(GET_RESPONSE_TIME(guid), {
      headers: AppHeaders(),
    });
    return res;
  }
}

export default ResponseService;
