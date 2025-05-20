import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Header from "../components/Header.js";
import OptionBar from "../components/OptionBar.js";
import { Swiper, SwiperSlide } from "swiper/react";
import Noti1 from "../assets/Noti1.jpg";
import CardSwiper from "../components/CardSwiper.js";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";

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

const ThemePage = () => {
  const [searchedItems, setSearchedItems] = useState([]);
  
  return (
    <>
      <GlobalStyle />
      <Container>
        <Header />
        <OptionBar setSearchedItems={setSearchedItems} />
        <StyledSwiper
          cssMode={true}
          navigation={true}
          pagination={{ clickable: true }}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          className="mySwiper"
        >
          <StyledSwiperSlide>
            <SlideImage src={Noti1} alt="Notification 1" />
          </StyledSwiperSlide>
          {/* <StyledSwiperSlide>Slide 2</StyledSwiperSlide>
          <StyledSwiperSlide>Slide 3</StyledSwiperSlide>
          <StyledSwiperSlide>Slide 4</StyledSwiperSlide>
          <StyledSwiperSlide>Slide 5</StyledSwiperSlide>
          <StyledSwiperSlide>Slide 6</StyledSwiperSlide>
          <StyledSwiperSlide>Slide 7</StyledSwiperSlide>
          <StyledSwiperSlide>Slide 8</StyledSwiperSlide>
          <StyledSwiperSlide>Slide 9</StyledSwiperSlide> */}
        </StyledSwiper>
        <CardSwiperContainer>
          <CardSwiper searchedItems={searchedItems} />
        </CardSwiperContainer>
      </Container>
    </>
  );
};

// ✅ 헤더와 Carousel을 감싸는 컨테이너 추가
const Container = styled.div`
  width: 1037px;
  min-height: 100vh;
  background: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledSwiper = styled(Swiper)`
  width: 988px;
  height: 304px;
  margin-top: 64px;
  border-radius: 5px;

    /* 페이지네이션 위치 조정 */
  .swiper-pagination {
    position: absolute;
    right: 20px; /* 우측으로 이동 */
    bottom: 10px; /* 기본 위치 */
    text-align: right; /* 점들이 우측 정렬되도록 설정 */
    width: auto; /* 기본 너비 해제 */
  }
  
  /* ✅ 페이지네이션 점 색상 변경 */
  .swiper-pagination-bullet {
    background: #B0B0B0; /* 선택되지 않은 점 (옅은 회색) */
    opacity: 0.6;
  }

  .swiper-pagination-bullet-active {
    background: #FFFFFF; /* 선택된 점 (하얀색) */
  }

  /* ✅ 화살표 색상 변경 */
  .swiper-button-next,
  .swiper-button-prev {
    color: #B0B0B0; /* 옅은 회색 */
  }
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  text-align: center;
  font-size: 18px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// ✅ Noti1 이미지 스타일 추가
const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const CardSwiperContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
  margin-bottom: 150px;
`;

export default ThemePage;
