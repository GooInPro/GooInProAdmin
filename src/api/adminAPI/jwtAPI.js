import axios from "axios";

const host = `${import.meta.env.VITE_API_HOST}/jwt`;

// 관리자 로그인 (토큰 발급)
export const loginAdmin = async (loginData) => {

    // loginData = { admid, admpw }
    const res = await axios.post(`${host}/makeToken`, loginData);

    console.log('loginAdmin' + res.data);
    return res.data;
}

// 관리자 로그아웃 (토큰 삭제)
export const logoutAdmin = async (admno) => {

    const res = await axios.post(`${host}/deleteToken?admno=${admno}`);

    console.log('logoutAdmin' + res.data);
    return res.data;
}

// 토큰 갱신 (리프레시 토큰으로 새로운 액세스 토큰 발급)
export const refreshToken = async (refreshToken) => {

    const res = await axios.post(`${host}/refreshToken`, { refreshToken });

    console.log('refreshToken' + res.data);
    return res.data;
}
