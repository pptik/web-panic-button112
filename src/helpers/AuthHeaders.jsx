import { jwtDecode } from "jwt-decode";

/* eslint-disable react-refresh/only-export-components */
export function AuthHeaders() {
  const token = localStorage.getItem("userToken");
  if (token !== null) {
    return { Authorization: "Bearer " + token };
  } else {
    return {};
  }
}

export function AppHeaders() {
  const token = localStorage.getItem("appToken");
  if (token !== null) {
    return { Authorization: "Bearer " + token };
  } else {
    return {};
  }
}

export function GetGuidCompany() {
  const token = localStorage.getItem("appToken");
  if (token !== null) {
    const decoded = jwtDecode(token);
    return decoded.companyGuid;
  } else {
    return null;
  }
}

export function GetGuidUser() {
  const token = localStorage.getItem("appToken");
  if (token !== null) {
    const decoded = jwtDecode(token);
    return decoded.guid;
  } else {
    return null;
  }
}

export function GetRole() {
  const token = localStorage.getItem("appToken");
  if (token !== null) {
    const decoded = jwtDecode(token);
    return decoded.role;
  } else {
    return null;
  }
}
