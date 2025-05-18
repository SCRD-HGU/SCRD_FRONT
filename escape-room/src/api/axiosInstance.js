// src/api/axiosInstance.js
import axios from "axios";
import { tokenState, refreshTokenState } from "../store/atom";
import decodeToken from "../utils/decodeToken";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { QueryClient } from "react-query";

// ✅ React Query 클라이언트 생성 (Axios 사용 시)
const queryClient = new QueryClient();

const useAxiosInstance = () => {
  const accessToken = useRecoilValue(tokenState);
  const refreshToken = useRecoilValue(refreshTokenState);
  const setAccessToken = useSetRecoilState(tokenState);
  const setRefreshToken = useSetRecoilState(refreshTokenState);
  const navigate = useNavigate();

  const isTokenExpired = (token) => {
    if (!token) return true;
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) return true;
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp - 2 < now;
  };

  const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
  });

  // ✅ 요청 인터셉터: 토큰 자동 추가
  instance.interceptors.request.use(async (config) => {
    if (!accessToken) {
      console.warn("❌ Access Token이 존재하지 않습니다. 로그인이 필요합니다.");
      navigate("/login");
      return Promise.reject("Access Token이 없습니다.");
    }

    // ✅ 토큰 만료 확인 및 자동 갱신
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
        handleLogout();
        return Promise.reject("Refresh Token 만료. 다시 로그인 필요.");
      }
    } else {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  });

  // ✅ 응답 에러 핸들링: React Query 캐시 초기화
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        console.error("❌ API 응답 에러 (401 Unauthorized):", error.response.data);
        handleLogout();
      }
      return Promise.reject(error);
    }
  );

  // ✅ 로그아웃 처리 함수 (React Query 캐시 초기화)
  const handleLogout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    queryClient.clear(); // React Query 캐시 초기화
    navigate("/login");
  };

  return instance;
};

export default useAxiosInstance;