import React from "react";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html, body {
    overflow-x: hidden;
    width: 100%
  }
`;

const TierPage = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <SemiContainer>
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
  justify-content: center;
  align-items: center;
`;


export default TierPage;