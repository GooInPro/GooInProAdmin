import axios from "axios";
import { useAdminAuthStore } from "../stores/adminauthstore";

const jwtAxios = axios.create();

// 요청 전 인터셉터: 요청에 Authorization 헤더를 추가
const beforeRequest = (config) => {
    console.log("beforeRequest");

    const adminAuthStore = useAdminAuthStore();
    const accessToken = adminAuthStore.accessToken;

    if (!accessToken) {
        throw new Error('Access Token not found');
    }

    console.log("accessToken", accessToken);
    // Authorization 헤더에 Bearer 토큰을 추가
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
};

// 요청 실패 인터셉터: 요청 중 에러 발생 시 호출
const failRequest = (error) => {
    console.log("fail Request");
    return Promise.reject(error);
};

// 응답 전 인터셉터: 응답 데이터를 검토하고 필요한 추가 작업을 수행
const beforeResponse = async (res) => {
    console.log("beforeResponse");

    const data = res.data;

    // 토큰 만료 여부를 확인
    if (data.error === 'ERROR_ACCESS_TOKEN') {
        console.log('Access token expired, attempting refresh');

        const adminAuthStore = useAdminAuthStore();
        const refreshTokenValue = adminAuthStore.refreshTokenValue;

        if (!refreshTokenValue) {
            throw new Error('Refresh token not found');
        }

        try {
            // 토큰 갱신 시도
            const success = await adminAuthStore.refreshAuth();

            if (success) {
                // 토큰 갱신 후 원래 요청을 재시도
                const originalRequest = res.config;
                originalRequest.headers.Authorization = `Bearer ${adminAuthStore.accessToken}`;
                return await axios(originalRequest);
            }
        } catch (error) {
            // 갱신 실패 시 로그아웃 처리 후 로그인 페이지로 이동
            console.error("Failed to refresh token:", error);
            adminAuthStore.logout();
            window.location.href = '/admin/login';
            throw error;
        }
    }

    return res;
};

// 응답 실패 인터셉터: 응답 에러 발생 시 호출
const failResponse = (error) => {
    console.log("fail Response");
    return Promise.reject(error);
};

// 요청과 응답에 대한 처리기를 axios 인스턴스에 추가
jwtAxios.interceptors.request.use(beforeRequest, failRequest);
jwtAxios.interceptors.response.use(beforeResponse, failResponse);

export default jwtAxios;
