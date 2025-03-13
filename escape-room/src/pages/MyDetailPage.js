import React ,{ useState }from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import Noti1 from "../assets/Noti1.svg";
import ReviewSection from "../components/Review.js";
import Header from "../components/Header.js";
import MyTheme from "../components/MyTheme.js";

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

const SwiperReviewPage = () => {
  const [selectedTab, setSelectedTab] = useState("reviews");

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
        <TabsContainer>
          <Tab
            selected={selectedTab === "themes"}
            onClick={() => setSelectedTab("themes")}
          >
            저장한 테마
          </Tab>
          <Separator />
          <Tab
            selected={selectedTab === "reviews"}
            onClick={() => setSelectedTab("reviews")}
          >
            내가 쓴 리뷰
          </Tab>
        </TabsContainer>
        <Line />
        {selectedTab === "reviews" ? (
          <ReviewSection useImageVersion={true} marginTop="17px" />
        ) : (
          <MyTheme />
        )}
      </Container>
    </>
  );
};

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

const TabsContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 60px;
  margin-left: 35px;
  align-self: flex-start;
`;

const Tab = styled.div`
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
  color: ${({ selected }) => (selected ? "var(--red-6, #D90206)" : "#FFF")};
`;

const Separator = styled.div`
  width: 1px;
  height: 16.016px;
  background: #898989;
`;

const Line = styled.div`
  width: 960px;
  height: 1px;
  background-color: #242424;
  border-radius: 1.25px;
  margin-top: 17px;
  margin-bottom: 40px;
`;

export default SwiperReviewPage;
