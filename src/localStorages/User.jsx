class User {
  SaveAppToken(data) {
    localStorage.setItem("appToken", data);
  }

  SaveUserToken(data) {
    localStorage.setItem("userToken", data);
  }

  Logout() {
    localStorage.clear();
  }
}
export default new User();
