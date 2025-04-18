import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { BsFillChatFill } from "react-icons/bs";
import LogoImage from "../assets/RedLogo.svg";
import LoginMarkImage from "../assets/LoginMark.svg";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html, body {
    width: 100%;
    min-height: 100vh;
    background-color: #000;
    overflow: hidden;
  }
`;

const LoginPage = () => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const scaleValue = window.innerWidth / 1440;
      setScale(scaleValue);
    };
    window.addEventListener("resize", updateScale);
    updateScale();
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const clickLogin = () => {
    window.location.href = process.env.REACT_APP_KAKAO_URL;
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper style={{ transform: `scale(${scale})` }}>
        <ContentBox>
          <LoginMark src={LoginMarkImage} />
          <Logo src={LogoImage} alt="Company Logo" />
          <LoginText>log in</LoginText>
          <LoginBT onClick={clickLogin}>
            <BsFillChatFill />
            Log in with Kakao
          </LoginBT>
        </ContentBox>
      </Wrapper>
    </>
  );
};

export default LoginPage;

const Wrapper = styled.div`
  width: 1440px;
  height: 900px;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  transform-origin: top left;
`;

const ContentBox = styled.div`
  width: 1037px;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Logo = styled.img`
  width: 48px;
  height: 48px;
  margin-top: 38px;
  margin-left: auto;
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
  margin-left: auto;
  z-index: 2;
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
  margin-left: auto;
  cursor: pointer;
  z-index: 2;

  svg {
    width: 20px;
    height: 19px;
    flex-shrink: 0;
    margin-right: 44px;
    display: inline-block;
  }
`;