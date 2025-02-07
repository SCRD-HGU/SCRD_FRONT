import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import Header from "../components/Header.js";
import dongsan from "../assets/Theme.png";

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
    <Container>
      <Header />
      <ThemeImage />
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
  width: 1037px;
  height: 100%;
  background: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ThemeImage = styled.div`
  width: 1034px;
  height: 305px;
  border-radius: 5px; /* 모서리를 둥글게 */
  
  background: 
    linear-gradient(0deg, #000 0%, rgba(0, 0, 0, 0.00) 100%), /* 검정색 그라디언트 */
    url(${dongsan}) lightgray 0px 2.798px / 100% 336.924% no-repeat; /* 이미지 적용 */
  
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
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