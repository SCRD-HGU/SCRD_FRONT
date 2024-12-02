import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

// 전역 스타일 설정
const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: "Neue Haas Grotesk Display Pro";
    src: url("../../public/assets/fonts/NeueHaasDisplayLight.ttf") format("truetype");
    font-weight: 300; /* Light */
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Neue Haas Grotesk Display Pro";
    src: url("../../public/assets/fonts/NeueHaasDisplayLight.ttf") format("truetype");
    font-weight: 500; /* Medium */
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Neue Haas Grotesk Display Pro";
    src: url("../../public/assets/fonts/NeueHaasDisplayLight.ttf") format("truetype");
    font-weight: 700; /* Bold */
    font-style: normal;
    font-display: swap;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const Loading = () => {
  const navigate = useNavigate();

  // 뷰포트 크기를 기준으로 scale 업데이트
  useEffect(() => {
    const updateScale = () => {
      const scale = window.innerWidth / 1440; // 기준 너비 1440px
      document.documentElement.style.setProperty("--scale", scale);
    };

    window.addEventListener("resize", updateScale); // 화면 크기 변경 시 업데이트
    updateScale(); // 초기 실행

    return () => window.removeEventListener("resize", updateScale); // 클린업
  }, []);

  return (
    <>
      <GlobalStyle /> {/* 전역 스타일 적용 */}
      <ScaledContainer>
        <SemiContainer>
          <FirstText>FOLLOW</FirstText>
          <SecondText>SCARLET</SecondText>
          <ThirdText>THREADS</ThirdText>
          <FirstBox>
            <InnerBox>
              <FirstText2>FOLLOW</FirstText2>
              <SecondText2>SCARLET</SecondText2>
              <ThirdText2>THREADS</ThirdText2>
            </InnerBox>
          </FirstBox>
          <SecondBox></SecondBox>
        </SemiContainer>
      </ScaledContainer>
    </>
  );
};

// 화면 비율 고정 컨테이너
const ScaledContainer = styled.div`
  transform: scale(var(--scale)); /* scale 속성 적용 */
  transform-origin: top left; /* 확대/축소 기준 */
  width: 1440px; /* 기준 너비 */
  height: 900px; /* 기준 높이 */
  background: #D90206; /* 전체 배경색 */
  display: flex;
  justify-content: center;
`;

const SemiContainer = styled.div`
  width: 1037px;
  height: 100%;
  background: #D90206;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const TextStyle = `
  color: #000;
  font-family: "Neue Haas Grotesk Display Pro";
  font-size: 200px;
  font-style: normal;
  font-weight: 500;
  text-transform: uppercase;
`;

const FirstText = styled.div`
  ${TextStyle}
  transform: rotate(-9.775deg) translate(175px, 0); /* 기울기와 위치 조정 */
`;

const SecondText = styled.div`
  ${TextStyle}
  transform: rotate(-9.775deg) translate(-300px, 20px); /* 기울기와 위치 조정 */
`;

const ThirdText = styled.div`
  ${TextStyle}
  transform: rotate(-9.775deg) translate(250px, 40px); /* 기울기와 위치 조정 */
`;

const FirstBox = styled.div`
  position: absolute; /* 다른 요소들에 영향을 주지 않음 */
  top: 48%; /* 화면 세로 중앙 */
  left: 50%; /* 화면 가로 중앙 */
  transform: translate(-50%, -50%); /* 정확한 중앙 배치 */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  
  width: 425.06px;
  height: 539.34px;
  background: transparent; /* 투명 배경 */
`;

const InnerBox = styled.div`
  width: 352.25px;
  height: 489.95px;
  transform: rotate(9.77deg);
  flex-shrink: 0;
  background-color: #D90206;
  box-shadow: 
    inset 0 0 20px rgba(0, 0, 0, 0.3), /* 내부 가장자리 부드러운 그림자 */
    inset 0 0 40px rgba(0, 0, 0, 0.2), /* 조금 더 퍼진 그림자 */
    inset 0 0 60px rgba(0, 0, 0, 0.1); /* 가장 부드러운 외곽 그림자 */
  overflow: hidden; /* 영역 밖 콘텐츠 숨기기 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0;
`;

const TextStyle2 = `
  color: #000; /* 텍스트 색상 */
  font-family: "Neue Haas Grotesk Display Pro", sans-serif;
  font-size: 180px; /* 폰트 크기 */
  font-style: normal;
  font-weight: 500;
  text-transform: uppercase;
  text-align: center; /* 중앙 정렬 */
`;

const FirstText2 = styled.div`
  ${TextStyle2}
  margin-bottom: 5px; /* 텍스트 간 간격 */
  transform: translate(130px, 0);
`;

const SecondText2 = styled.div`
  ${TextStyle2}
  margin-bottom: 5px;
  transform: translate(-265px, 0);
`;

const ThirdText2 = styled.div`
  ${TextStyle2}
  transform: translate(275px, 0);
`;

const SecondBox = styled.div``;

export default Loading;
