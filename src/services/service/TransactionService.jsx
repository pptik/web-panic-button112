import { AppHeaders } from "../../helpers/AuthHeaders";
import API_ENDPOINT from "../global";
import { appApi } from "../global/config";

const { ADD_TRANSACTION } = API_ENDPOINT;

class TransactionService {
  static async AddTransactionBySuperAdmin(guid, data) {
    const res = await appApi.post(ADD_TRANSACTION(guid), data, {
      headers: AppHeaders(),
    });
    return res;
  }
}

export default TransactionService;
