import queryString from "query-string";
import { AppHeaders } from "../../helpers/AuthHeaders";
import API_ENDPOINT from "../global";
import { appApi } from "../global/config";

const { ADD_TRANSACTION, GET_TRANSACTION, CHANGE_STATUS_HANDLING } =
  API_ENDPOINT;

class TransactionService {
  static async AddTransactionBySuperAdmin(guid, data) {
    const res = await appApi.post(ADD_TRANSACTION(guid), data, {
      headers: AppHeaders(),
    });
    return res;
  }

  static async GetTransactionOpd(data) {
    const stringified = queryString.stringify(data);
    const res = await appApi.get(GET_TRANSACTION(stringified), {
      headers: AppHeaders(),
    });
    return res;
  }

  static async ChangeStatusHandling(guid) {
    const res = await appApi.put(
      CHANGE_STATUS_HANDLING(guid),
      {},
      {
        headers: AppHeaders(),
      }
    );
    return res;
  }
}

export default TransactionService;
