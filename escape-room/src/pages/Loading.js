import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes, createGlobalStyle } from "styled-components";

// 전역 스타일 설정
const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const moveLeft = keyframes`
  0% {
    transform: rotate(-9.775deg) translateX(0);
  }
  100% {
    transform: rotate(-9.775deg) translateX(-400px);
  }
`;

const moveRight = keyframes`
  0% {
    transform: rotate(-9.775deg) translateX(0);
  }
  100% {
    transform: rotate(-9.775deg) translateX(400px);
  }
`;

const moveLeftForText2 = keyframes`
  0% {
    transform: rotate(9.77deg) translateX(0);
  }
  100% {
    transform: rotate(9.77deg) translateX(-400px);
  }
`;

const moveRightForText2 = keyframes`
  0% {
    transform: rotate(9.77deg) translateX(0);
  }
  100% {
    transform: rotate(9.77deg) translateX(400px);
  }
`;

const moveLeftForText3 = keyframes`
  0% {
    transform: rotate(6.8deg) translateX(0);
  }
  100% {
    transform: rotate(6.8deg) translateX(-400px);
  }
`;

const moveRightForText3 = keyframes`
  0% {
    transform: rotate(6.8deg) translateX(0);
  }
  100% {
    transform: rotate(6.8deg) translateX(400px);
  }
`;

const Loading = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setLoading(false);
        navigate("/main");
      }, 1000);
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  if(loading) {
    return (
      <>
        <GlobalStyle /> {/* 전역 스타일 적용 */}
        <ScaledContainer fadeOut={fadeOut}>
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
            <SecondBox>
              <LastBox>
                <FirstText3>FOLLOW</FirstText3>
                <SecondText3>SCARLET</SecondText3>
                <ThirdText3>THREADS</ThirdText3>
              </LastBox>
            </SecondBox>
            {/* ESCAPE ROOM TEAM MATCHING 텍스트 추가 */}
            <MatchingText1>{"ESCAPE ROOM\nTEAM MATCHING"}</MatchingText1>
            <MatchingText2>{"ESCAPE ROOM\nTEAM MATCHING"}</MatchingText2>
            <MatchingText3>{"ESCAPE ROOM\nTEAM MATCHING"}</MatchingText3>
          </SemiContainer>
        </ScaledContainer>
      </>
    );
  }

  return null;

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
  opacity: ${(props) => (props.fadeOut ? 0 : 1)};
  transition: opacity 1s ease-out;
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
  font-size: 230px;
  font-style: normal;
  font-weight: 500;
  text-transform: uppercase;
`;

const FirstText = styled.div`
  ${TextStyle}
  transform: rotate(-9.775deg) translate(175px, 0); /* 기울기와 위치 조정 */
  animation: ${moveLeft} 2s ease-out forwards;
`;

const SecondText = styled.div`
  ${TextStyle}
  transform: rotate(-9.775deg) translate(-300px, 20px); /* 기울기와 위치 조정 */
  animation: ${moveRight} 2s ease-out forwards;
`;

const ThirdText = styled.div`
  ${TextStyle}
  transform: rotate(-9.775deg) translate(250px, 40px); /* 기울기와 위치 조정 */
  animation: ${moveLeft} 2s ease-out forwards;
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
  animation: ${moveLeftForText2} 2s ease-out forwards;
`;

const SecondText2 = styled.div`
  ${TextStyle2}
  margin-bottom: 5px;
  transform: translate(-265px, 0);
  animation: ${moveRightForText2} 2s ease-out forwards;
`;

const ThirdText2 = styled.div`
  ${TextStyle2}
  transform: translate(275px, 0);
  animation: ${moveLeftForText2} 2s ease-out forwards;
`;

const SecondBox = styled.div`
  display: flex;
  width: 226.64px;
  height: 293.56px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  position: absolute; /* 절대 위치로 설정 */
  top: 50%; /* 세로 중앙 정렬 */
  left: 50%; /* 가로 중앙 정렬 */
  transform: translate(-50%, -50%); /* 정확한 중앙 정렬 */
`;


const LastBox = styled.div`
  width: 195.8px;
  height: 272.3px;
  transform: rotate(-6.8deg);
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
  z-index: 10;
`;

const TextStyle3 = `
  color: #000; /* 텍스트 색상 */
  font-family: "Neue Haas Grotesk Display Pro", sans-serif;
  font-size: 150px; /* 폰트 크기 */
  font-style: normal;
  font-weight: 500;
  text-transform: uppercase;
  text-align: center; /* 중앙 정렬 */
  line-height: 0.8;
`;

const FirstText3 = styled.div`
  ${TextStyle3}
  transform: rotate(6.8deg) translateX(120px); /* 회전 후 X축 이동 */
  animation: ${moveLeftForText3} 2s ease-out forwards;

`;

const SecondText3 = styled.div`
  ${TextStyle3}
  transform: rotate(6.8deg) translateX(-220px);
  animation: ${moveRightForText3} 2s ease-out forwards;
`;

const ThirdText3 = styled.div`
  ${TextStyle3}
  transform: rotate(6.8deg) translateX(200px);
  animation: ${moveLeftForText3} 2s ease-out forwards;
`;

const MatchingText = styled.div`
  position: absolute;
  color: #fff;
  font-family: "Neue Haas Grotesk Display Pro", sans-serif;
  font-size: 22px;
  font-weight: 500;
  line-height: normal;
  text-transform: uppercase;
  transform: rotate(-9.775deg); /* 기울기 */
  white-space: pre-line;
`; 

const MatchingText1 = styled(MatchingText)`
  top: 5vh; /* 화면 높이의 20% */
  left: 30vw; /* 화면 너비의 15% */
  z-index: 10;
`;

const MatchingText2 = styled(MatchingText)`
  top: 35vh;
  right: 23vw;
  z-index: 10;
`;

const MatchingText3 = styled(MatchingText)`
  bottom: 3vh;
  left: 20vw;
  z-index: 10;
`;


export default Loading;