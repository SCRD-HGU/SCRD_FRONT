import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Mousewheel } from "swiper/modules";
import styled, { createGlobalStyle } from "styled-components";
import Header from "../components/Header.js";
import InfoOverlay from "../components/InfoOverlay.js";
import CardPage from "../pages/CardPage.js";
import OptionBar from "../components/OptionBar.js";
import MainPage_Background from "../assets/mainpage_background.svg";
import dongsan from "../assets/Theme.png";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/mousewheel";


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


const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  const [isCardPageVisible, setIsCardPageVisible] = useState(false);
  const cardPageRef = useRef(null);

  useEffect(() => {
    if(swiperRef.current) {
      setActiveIndex(swiperRef.current.realIndex);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsCardPageVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (cardPageRef.current) {
      observer.observe(cardPageRef.current);
    }

    return () => {
      if (cardPageRef.current) observer.unobserve(cardPageRef.current);
    };
  }, []);

  return (
    <>
      <GlobalStyle />
      <PageContainer> {/* ✅ 헤더와 Carousel을 감싸는 컨테이너 */}
        <Header />
        <Title>
          MAKE YOU PULSE
        </Title>
        <SubTitle>
          Select the theme you want from the list
        </SubTitle>
        <CarouselContainer>
          <StyledSwiper
            ref={swiperRef}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            loop={true}
            loopAdditionalSlides={1}
            watchSlidesProgress={true}
            mousewheel={{ sensitivity: 0.5, releaseOnEdges: true }}
            coverflowEffect={{
              rotate: -16,
              stretch: 0,
              depth: 100,
              modifier: 1.2,
              slideShadows: false,
            }}
            modules={[EffectCoverflow, Mousewheel]}
            className="carousel"
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          >
            {[...Array(7)].map((_, index) => (
              <StyledSwiperSlide key={index}>
                <img 
                  src={dongsan}
                  alt={`Slide ${index + 1}`}
                  style={{ 
                    width: "231px", 
                    height: "314px",
                    borderRadius: "5px",
                    objectFit: "cover"
                  }} 
                />
                {activeIndex === index && (
                <InfoOverlay
                  title = "머니머니 부동산"
                  rating = "5"
                  location="강남"
                  branch="케이스케이프 스테이션점"
                />
                )}
              </StyledSwiperSlide>
            ))}
          </StyledSwiper>
        </CarouselContainer>
        <More>MORE THEMES</More>
        <MoreContainer>
          <MoreLine />
          <MoreCircle />
        </MoreContainer>

        <CardPageContainer ref={cardPageRef}>
          <CardPage />
        </CardPageContainer>

        {isCardPageVisible && <FixedFilterBar><OptionBar /></FixedFilterBar>}
      </PageContainer>
    </>
  );
};


// ✅ 헤더와 Carousel을 감싸는 컨테이너 추가
const PageContainer = styled.div`
  width: 1034px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(${MainPage_Background});
  background-size: 100%;
  background-position: center top;
  background-repeat: no-repeat;
`;

const Title = styled.div`
  margin-top: 147px;

  color: #FFF;
  font-family: Pretendard;
  font-size: 76px;
  font-style: normal;
  font-weight: 700;
  line-height: 69px; /* 90.789% */
  text-transform: uppercase;
`;

const SubTitle = styled.div`
  color: #FFF;
  font-family: "Pretendard Variable";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 50px; /* 312.5% */
`;

const CarouselContainer = styled.div`
  width: 1034px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledSwiper = styled(Swiper)`
  width: 80%;
  height: 400px;
  display: flex;  
  justify-content: center;  /* ✅ 중앙 정렬 */
  align-items: center;  /* ✅ 세로 중앙 정렬 */
  perspective: 1200px;
  background: transparent;
  padding: 40px 0;
  overflow: hidden;

  margin-left:
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  position: relative;
  transform-origin: center bottom; /* ✅ 회전 기준점을 슬라이드 하단으로 설정 */
  transform-style: preserve-3d;
  transition: transform 0.8s ease-in-out, opacity 0.5s ease-in-out;
  width: 250px;
  height: 350px;

  &.swiper-slide-active {
    transform: scale(1) rotateY(0deg) translateY(0px); /* ✅ 현재 슬라이드는 원래 크기 유지 */
    opacity: 1;
  }

  &.swiper-slide-prev,
  &.swiper-slide-next {
    transform: rotateY(-30deg) scale(1) translateY(0px); /* ✅ 크기 차이 제거 */
  }

  &.swiper-slide-prev {
    transform: rotateY(-30deg) translateX(-50px) scale(1) translateY(0px);
  }

  &.swiper-slide-next {
    transform: rotateY(30deg) translateX(50px) scale(1) translateY(0px);
  }
`;

const More = styled.div`
  color: #FFF;
  font-family: "Pretendard Variable";
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: 50px;

  margin-top: 156px;
`;

const MoreContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
`;

const MoreLine = styled.div`
  width: 1px;
  height: 60px;
  background-color: white;
`;

const MoreCircle = styled.div`
  width: 10px;
  height: 10px;
  background-color: white;
  border-radius: 50%;
`;

const CardPageContainer = styled.div`
  width: 1153px;
  height: 907px;
  display: flex;
  justify-content: center;

  margin-top: -35px;
`;

const FixedFilterBar = styled.div`
  position: fixed;
  left: 50;
  bottom: 60px;
  transition: opacity 0.5s ease-in-out;
  z-index: 1000;
`;

export default Carousel;
