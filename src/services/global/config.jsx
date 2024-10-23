import axios from "axios";
import URL from "./url";

const { API_URL, USER_URL } = URL;

export const appApi = axios.create({
  baseURL: API_URL,
});

export const userApi = axios.create({
  baseURL: USER_URL,
});
