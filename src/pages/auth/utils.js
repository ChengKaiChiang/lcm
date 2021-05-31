const TOKEN_NAME = "token";

// 將 token 存到 localStorage
export const setAuthToken = (token) => {
  localStorage.setItem(TOKEN_NAME, token);
};

// 從 localStorage 讀取 token
export const getAuthToken = () => {
  console.log(localStorage.getItem(TOKEN_NAME));
  return localStorage.getItem(TOKEN_NAME);
};