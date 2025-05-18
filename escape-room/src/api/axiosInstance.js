// src/api/axiosInstance.js
import axios from "axios";
import { tokenState, refreshTokenState } from "../store/atom";
import decodeToken from "../utils/decodeToken";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

const useAxiosInstance = () => {
  const accessToken = useRecoilValue(tokenState);
  const refreshToken = useRecoilValue(refreshTokenState);
  const setAccessToken = useSetRecoilState(tokenState);
  const setRefreshToken = useSetRecoilState(refreshTokenState);
  const navigate = useNavigate();

  const isTokenExpired = (token) => {
    if (!token) return true; // 토큰이 없는 경우도 만료로 처리
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) return true;
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp - 2 < now; // 2초의 여유를 줌
  };

  const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
  });

  // ✅ 요청 전 토큰 자동 붙이기
  instance.interceptors.request.use(async (config) => {
    if (!accessToken) {
      console.warn("❌ Access Token이 존재하지 않습니다. 로그인이 필요합니다.");
      navigate("/login"); // 로그인 페이지로 이동
      return Promise.reject("Access Token이 없습니다.");
    }

    if (isTokenExpired(accessToken)) {
      console.log("🕐 Access token expired. Attempting to refresh...");

      try {
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
      } catch (refreshError) {
        console.error("❌ Refresh Token으로 Access Token 갱신 실패:", refreshError);
        setAccessToken(null);
        setRefreshToken(null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/login"); // 로그인 페이지로 이동
        return Promise.reject("Refresh Token 만료. 다시 로그인 필요.");
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
      if (error.response && error.response.status === 401) {
        console.error("❌ API 응답 에러 (401 Unauthorized):", error.response.data);
        // 만약 401 오류가 발생하면 자동으로 로그인 페이지로 이동
        navigate("/login");
      }
      console.error("❌ API 응답 에러:", error.response || error.message);
      return Promise.reject(error);
    }
  );

  return instance;
};

export default useAxiosInstance;