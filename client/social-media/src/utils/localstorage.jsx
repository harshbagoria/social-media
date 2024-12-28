export const KEY_ACCESS_TOKEN = "access_Token";

export function getItem(key) {
  // use lowercase 'key'
  return localStorage.getItem(key);
}

export function setItem(key, value) {
  // already correct
  localStorage.setItem(key, value);
}

export function removeItem(key) {
  // correct the typo from 'removeitem' to 'removeItem'
  localStorage.removeItem(key);
}
