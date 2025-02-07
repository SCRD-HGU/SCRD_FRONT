import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import Header from "../components/Header.js";

const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    display: flex;
    justify-content: center;
    min-width: 100vw;
    min-height: 100vh;
    background-color: #000000;

    overflow-x: hidden;
  }
`;

const Detail = () => {
  return (
    <>
    <GlobalStyle />
    <Header />
    <Container>
      <ThemeImage>
      </ThemeImage>
      <DetailInfo>

      </DetailInfo>
      <Reservation>

      </Reservation>
      <Review>

      </Review>
      <Buttons>

      </Buttons>
    </Container>
    </>
  )
}

const Container = styled.div`
  transform: scale(var(--scale)); /* scale 속성 적용 */
  transform-origin: top left; /* 확대/축소 기준 */
  width: 1440px; /* 기준 너비 */
  height: 900px; /* 기준 높이 */
  background: #000; /* 전체 배경색 */
  display: flex;
  justify-content: center;
`;

const ThemeImage = styled.img`
`;

const DetailInfo = styled.div`
`;

const Reservation = styled.div`
`;

const Review = styled.div`
`;

const Buttons = styled.div`
`;

export default Detail;