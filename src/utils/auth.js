import Cookies from "js-cookie";
const tokenName = "SESSION";

export function getToken() {
  return Cookies.get(tokenName);
}

export function setToken(token, config) {
  return Cookies.set(tokenName, token, config);
}

export function removeToken() {
  return Cookies.remove(tokenName);
}
