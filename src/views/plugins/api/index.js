import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8082",
  timeout: 30000,
});

export const authToken = function () {
  let token = null;
  if (window.sessionStorage.getItem("token")) {
    const cekToken = window.sessionStorage.getItem("token");
    let [header, payload, signature] = cekToken.split(".");
    token = JSON.parse(window.atob(payload));
  }
  return token;
};
