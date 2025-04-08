import axios from "axios";
import decodeToken from "../utils/decodeToken";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { tokenState, refreshTokenState } from "../store/atom";

const useApi = () => {
  const accessToken = useRecoilValue(tokenState);
  const refreshToken = useRecoilValue(refreshTokenState);
  const setAccessToken = useSetRecoilState(tokenState);
  const setRefreshToken = useSetRecoilState(refreshTokenState);

  const isTokenExpired = (token) => {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) return true;
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp - 2 < currentTime; // 2초 여유두기
  };

  const sendRequest = async (endpoint, method = "GET", data = null) => {
    let token = accessToken;
    let headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    // 🔁 access token이 만료되었으면 refresh token으로 갱신
    if (isTokenExpired(token)) {
      console.log("🕒 Access token expired. Attempting to refresh...");

      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/refresh`, {
          headers: {
            "x-refresh-token": refreshToken,
          },
        });

        const newAccess = res.headers["authorization"]?.split(" ")[1];
        const newRefresh = res.headers["x-refresh-token"];

        if (newAccess) {
          setAccessToken(newAccess);
          token = newAccess;
          headers.Authorization = `Bearer ${newAccess}`;
          localStorage.setItem("accessToken", newAccess); // ✅ 선택 사항
        }

        if (newRefresh) {
          setRefreshToken(newRefresh);
          localStorage.setItem("refreshToken", newRefresh); // ✅ 선택 사항
        }

        console.log("✅ 토큰 재발급 완료");

      } catch (err) {
        console.error("❌ Refresh token failed", err);
        throw err;
      }
    }

    // 📡 최종 API 요청
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_BASE_URL}${endpoint}`,
        method,
        headers,
        data, // POST, PUT 요청 시 사용
      });

      return response.data;

    } catch (error) {
      console.error("❌ API 요청 실패:", error);

      // 🔐 에러 코드에 따라 분기 처리 가능
      if (error.response?.status === 401) {
        console.warn("⚠️ 인증 오류 - 로그인 필요");
        // → 필요 시 로그아웃 처리나 로그인 페이지로 리디렉션
      }

      throw error;
    }
  };

  return sendRequest;
};

export default useApi;