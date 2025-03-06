import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
// Swiper 스타일 import
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// Swiper 기능 모듈 import
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";

import Noti1 from "../assets/Noti1.svg";
import ReviewSection from "../components/Review.js"; // Review.js 파일에서 기본 내보내기를 가져옴
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
    background-color: #000;
    overflow-x: hidden;
  }
`;

const Container = styled.div`
  width: 1037px;
  height: 100%;
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

  /* 페이지네이션 위치 및 스타일 */
  .swiper-pagination {
    position: absolute;
    right: 20px;
    bottom: 10px;
    text-align: right;
    width: auto;
  }
  
  .swiper-pagination-bullet {
    background: #B0B0B0;
    opacity: 0.6;
  }
  
  .swiper-pagination-bullet-active {
    background: #FFFFFF;
  }
  
  .swiper-button-next,
  .swiper-button-prev {
    color: #B0B0B0;
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

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const SwiperReviewPage = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Header/>
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
          <StyledSwiperSlide>Slide 2</StyledSwiperSlide>
          <StyledSwiperSlide>Slide 3</StyledSwiperSlide>
          <StyledSwiperSlide>Slide 4</StyledSwiperSlide>
          <StyledSwiperSlide>Slide 5</StyledSwiperSlide>
          <StyledSwiperSlide>Slide 6</StyledSwiperSlide>
          <StyledSwiperSlide>Slide 7</StyledSwiperSlide>
          <StyledSwiperSlide>Slide 8</StyledSwiperSlide>
          <StyledSwiperSlide>Slide 9</StyledSwiperSlide>
        </StyledSwiper>

        {/* Swiper 아래에 리뷰 섹션 추가 */}
        <ReviewSection />
      </Container>
    </>
  );
};

export default SwiperReviewPage;
