import { AppHeaders } from "../../helpers/AuthHeaders";
import API_ENDPOINT from "../global";
import { appApi } from "../global/config";

const {
  ADD_CASE,
  GET_CASE_DONE,
  GET_CASE,
  GET_ALL_CASE,
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

  static async GetCaseDone() {
    const res = await appApi.get(GET_CASE_DONE, { headers: AppHeaders() });
    return res;
  }

  static async GetCase() {
    const res = await appApi.get(GET_CASE, { headers: AppHeaders() });
    return res;
  }

  static async GetAllCase() {
    const res = await appApi.get(GET_ALL_CASE, { headers: AppHeaders() });
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
      headers: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJndWlkIjoiVVNFUi1iMTRkMGNiZC0xOTA4LTRjNjItOGZmMC1kZDNlMzQwYWU5ZjUtMjAyNCIsIm5hbWUiOiJNLiBBamkgUGVyZGFuYWFhIiwiZ3VpZEFwbGljYXRpb24iOiJQUk9KRUNULWJiN2NjOWNiLWM5NjEtNDEyMS1iZGNiLTNjNmVjMjE0NGU1NS0yMDI0Iiwicm9sZSI6InN1cGVyX2FkbWluIiwiY29tcGFueUd1aWQiOiJDT01QQU5ZLWExNDYxZDZlLTYzNDEtNGQzMS1hNzg2LTVmNDA2Y2M0YjlmNS0yMDI0IiwiaWF0IjoxNzMwMDgyMjIyLCJleHAiOjE3MzA2ODcwMjJ9.a-oXJ8tErXK2L6lMW1r7-fkalEjaS-eG_RX4M7nE0j0`,
    });
    return res;
  }
}

export default CaseService;
