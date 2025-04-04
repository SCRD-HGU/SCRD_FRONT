import React from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import { BsFillChatFill } from "react-icons/bs";
import LogoImage from "../assets/RedLogo.svg";
import LoginMarkImage from "../assets/LoginMark.svg";

const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    display: flex;
    justify-content: center; /* 수평 중앙 정렬 */
    min-width: 100vw;
    min-height: 100vh;
    background-color: #000000;
    overflow-x: hidden;
}
`;

const LoginPage = () => {
  const clickLogin = () => {
    window.location.href = process.env.REACT_APP_KAKAO_URL;
    // 아래는 임시로 그냥 메인으로 이동하도록
    // window.location.href = "/main";
  };
  return (
    <>
      <GlobalStyle />
      <Container>
        <SemiContainer>
          <LoginMark src={LoginMarkImage} />
          <Logo src={LogoImage} alt="Company Logo" />
          <LoginText>log in</LoginText>
          <LoginBT onClick={clickLogin}>
          <BsFillChatFill />
          Log in with Kakao
          </LoginBT>
        </SemiContainer>
      </Container>
    </>
  );
};

const Container = styled.div`
  transform: scale(var(--scale)); /* scale 속성 적용 */
  transform-origin: top left; /* 확대/축소 기준 */
  width: 1440px; /* 기준 너비 */
  height: 900px; /* 기준 높이 */
  background: #000; /* 전체 배경색 */
  display: flex;
  justify-content: center;
`;

const SemiContainer = styled.div`
  width: 1037px;
  height: 100%;
  background: #000;
  display: flex;
  flex-direction: column;
`;

const Logo = styled.img`
  width: 48px;
  height: 48px;
  margin-top: 38px;
  margin-left: 90%;
`;

const LoginMark = styled.img`
  position: absolute;
  opacity: 0.5;
  z-index: 1;
  width: 700px;
  height: 900px;
`;

const LoginText = styled.p`
  font-size: 36px;
  color: #ffffff;
  font-weight: bold;
  margin-bottom: 23px;
  margin-top: 35%;
  margin-left: 55%;
`;

const LoginBT = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  border: 1px solid #d90206;
  width: 262px;
  height: 46px;
  color: #d90206;
  background: #00ff0000;
  font-size: 15px;
  padding-right: 20px;
  margin-left: 55%;
  cursor: pointer;
  svg {
    width: 20px;
    height: 19px;
    flex-shrink: 0;
    margin-right: 44px;
    display: inline-block;
  }
`;

export default LoginPage;
