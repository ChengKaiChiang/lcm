import { getAuthToken } from "./utils";

// 身分驗證
export const getUser = () => {
    // 從 localStorage 讀取 token
    const token = getAuthToken();

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${process.env.REACT_APP_API_SERVER}/user`, requestOptions).then((res) => res.json())
};