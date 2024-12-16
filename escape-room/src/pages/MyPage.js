import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import LogoImage from "../assets/Logo.svg";

const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const MyPage = () => {

  return (
    <>
      <GlobalStyle />
      <ScaledContainer>
        <SemiContainer>
          <TextArea>
            There's the scarlet{"\n"}
            thread of murder{"\n"}
            running through the{"\n"}
            colourless skein{"\n"}
            of life
          </TextArea>
          <Logo src={LogoImage} alt="Logo" />
        </SemiContainer>
      </ScaledContainer>
    </>
  )
}


const ScaledContainer = styled.div`
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
  background: #000;
  display: flex;
  overflow: hidden;
`;

const TextArea = styled.div`
  width: 938px;
  color: #FFF;
  font-family: "Neue Haas Grotesk Display Pro";
  font-size: 72px;
  font-style: normal;
  font-weight: 350;
  line-height: 80px;
  text-transform: uppercase;
  white-space: pre-wrap; /* \n 줄바꿈 적용 */

  margin-top: 38px;
  margin-left: 38px;
`;

const Logo = styled.img`
  width: 55px;
  height: 55px;

  margin-top: 38px;
  margin-right: 38px;
`;

export default MyPage;