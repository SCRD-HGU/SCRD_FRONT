import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import styled, { keyframes } from "styled-components";
import LogoImg from "../assets/Logo.svg";
import {
  userTokenState,
  tokenState,
  codeState,
  refreshTokenState,
} from "../store/atom";

const KakaoLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const setCode = useSetRecoilState(codeState);
  const setUserToken = useSetRecoilState(userTokenState);
  const setRefreshToken = useSetRecoilState(refreshTokenState);
  const setToken = useSetRecoilState(tokenState);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");
    setCode(code);

    if (code) {
      const apiUrl = `${process.env.REACT_APP_BASE_URL}/auth/kakao-login?code=${code}`;

      axios
        .get(apiUrl, {
          headers: {
            Referer: "http://localhost:3000",
          },
        })
        .then((response) => {
          const accessToken = response.headers["authorization"].split(" ")[1];
          const refreshToken = response.headers["x-refresh-token"];

          setUserToken({ isLoggedIn: true });
          setToken(accessToken);
          setRefreshToken(refreshToken);

          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          navigate("/main");
        })
        .catch((error) => {
          console.error("Error during Kakao login:", error);
        });
    }
  }, [location.search, setCode, setUserToken, setToken, setRefreshToken, navigate]);

  return (
    <Container>
      <Logo src={LogoImg} alt="App Logo" />
      <Message>카카오 계정으로 로그인 중입니다...</Message>
      <Spinner />
    </Container>
  );
};

export default KakaoLogin;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fffef9;
`;

const Logo = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
`;

const Message = styled.div`
  font-size: 18px;
  margin-bottom: 16px;
  color: #333;
`;

const Spinner = styled.div`
  border: 4px solid #e0e0e0;
  border-top: 4px solid #fae100; /* 카카오 스타일 노랑색 */
  border-radius: 50%;
  width: 36px;
  height: 36px;
  animation: ${spin} 1s linear infinite;
`;