import { AppHeaders } from "../../helpers/AuthHeaders";
import API_ENDPOINT from "../global";
import { appApi } from "../global/config";

const {
  ADD_DEVICE,
  GET_DEVICE,
  GET_DEVICE_BY_ID,
  UPDATE_DEVICE,
  DELETE_DEVICE,
} = API_ENDPOINT;

class DeviceService {
  static async AddDevice(data) {
    const res = await appApi.post(ADD_DEVICE, data, { headers: AppHeaders() });
    return res;
  }

  static async GetDevice() {
    const res = await appApi.get(GET_DEVICE, { headers: AppHeaders() });
    return res;
  }

  static async GetDeviceByGuid(guid) {
    const res = await appApi.get(GET_DEVICE_BY_ID(guid), {
      headers: AppHeaders(),
    });
    return res;
  }

  static async UpdateDevice(guid, data) {
    const res = await appApi.put(UPDATE_DEVICE(guid), data, {
      headers: AppHeaders(),
    });
    return res;
  }

  static async DeleteDevice(guid) {
    const res = await appApi.delete(DELETE_DEVICE(guid), {
      headers: AppHeaders(),
    });
    return res;
  }
}

export default DeviceService;
