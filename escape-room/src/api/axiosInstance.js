// src/api/axiosInstance.js
import axios from "axios";
import { tokenState, refreshTokenState } from "../store/atom";
import decodeToken from "../utils/decodeToken";
import { useRecoilValue, useSetRecoilState } from "recoil";

const useAxiosInstance = () => {
  const accessToken = useRecoilValue(tokenState);
  const refreshToken = useRecoilValue(refreshTokenState);
  const setAccessToken = useSetRecoilState(tokenState);
  const setRefreshToken = useSetRecoilState(refreshTokenState);

  const isTokenExpired = (token) => {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) return true;
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp - 2 < now;
  };

  const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
  });

  // ✅ 요청 전 토큰 자동 붙이기
  instance.interceptors.request.use(async (config) => {
    if (isTokenExpired(accessToken)) {
      console.log("🕐 Access token expired. Attempting to refresh...");

      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/refresh`, {
        headers: { "x-refresh-token": refreshToken },
      });

      const newAccess = res.headers["authorization"]?.split(" ")[1];
      const newRefresh = res.headers["x-refresh-token"];

      if (newAccess) {
        setAccessToken(newAccess);
        localStorage.setItem("accessToken", newAccess);
        config.headers.Authorization = `Bearer ${newAccess}`;
      }

      if (newRefresh) {
        setRefreshToken(newRefresh);
        localStorage.setItem("refreshToken", newRefresh);
      }
    } else {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  });

  // ✅ 응답 에러 핸들링
  instance.interceptors.response.use(
    (res) => res,
    (error) => {
      console.error("❌ API 응답 에러:", error.response || error.message);
      return Promise.reject(error);
    }
  );

  return instance;
};

export default useAxiosInstance;