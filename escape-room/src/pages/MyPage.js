import React, { useState } from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import LogoImage from "../assets/Logo.svg";
import Arrow from "../assets/Arrow.svg";
import FirstVideo from "../assets/FirstVideo.mp4";
import SecondVideo from "../assets/SecondVideo.mp4";
import { Link } from "react-router-dom";

const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const MyPage = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <GlobalStyle />
      <Container>
        <SemiContainer>
          <HeaderLogoWrapper>
            <HeaderText>
              THERE'S THE SCARLET <br />
              THREAD OF MURDER <br />
              RUNNING THROUGH THE <br />
              COLOURLESS SKEIN <br />
              OF LIFE
            </HeaderText>
            <Logo src={LogoImage} alt="Company Logo" />
          </HeaderLogoWrapper>
          <ButtonCircleWrapper>
            <ToggleButtonWrapper
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <ToggleButtonBackground hovered={hovered} />
              <ToggleButtonTextLeft hovered={hovered}>
                {hovered ? "TIER" : "scarlet"}
              </ToggleButtonTextLeft>
              <ToggleButtonTextRight>HOLMES (59)</ToggleButtonTextRight>
            </ToggleButtonWrapper>
            <CircleMenu>
              <Circle1>
                <TitleSubWrapper>
                  <TitleText1>
                    고객 센터
                  </TitleText1>
                  <SubText1>문의하기</SubText1>
                  <SubText1>공지사항</SubText1>
                  <SubText1>리뷰 일괄 입력</SubText1>
                </TitleSubWrapper>
              </Circle1>
              <Circle2>
                <TitleSubWrapper>
                  <TitleText2>
                    더보기
                  </TitleText2>
                  <SubText2>ABOUT USCRD</SubText2>
                  <SubText2>NEWS</SubText2>
                  <SubText2>방탈출예약제휴</SubText2>
                </TitleSubWrapper>
              </Circle2>
            </CircleMenu>
          </ButtonCircleWrapper>
          <MovingAreaWrapper>
            <MovingArea>
            <Ellipse>
                <video src={FirstVideo} autoPlay loop muted />
                <LinkText>
                  REVIEW (52)
                  <ArrowIcon src={Arrow} alt="Arrow Icon" />
                </LinkText>
                <LinkText>
                  RECORD
                  <ArrowIcon src={Arrow} alt="Arrow Icon" />
                </LinkText>
                <LinkText>
                  MY THEME
                  <ArrowIcon src={Arrow} alt="Arrow Icon" />
                </LinkText>
              </Ellipse>
              <Ellipse>
                <StyledVideo src={SecondVideo} autoPlay loop muted />
                <LinkText>
                  MY THEME
                  <ArrowIcon src={Arrow} alt="Arrow Icon" />
                </LinkText>
                <LinkText>
                  ABOUT CREW
                  <ArrowIcon src={Arrow} alt="Arrow Icon" />
                </LinkText>
              </Ellipse>
            </MovingArea>
          </MovingAreaWrapper>
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

const HeaderLogoWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 100px;
`;

const HeaderText = styled.div`
  color: #FFF;
  font-family: "Neue Haas Grotesk Display Pro";
  font-size: 72px;
  font-style: normal;
  font-weight: 450;
  line-height: 80px;
  text-transform: uppercase;
`;

const ButtonCircleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; /* 수직 중앙 정렬 추가 */
  gap: 272px;
  margin-bottom: 82px;
`;

const ToggleButtonWrapper = styled.div`
  display: flex;
  position: relative;
  width: 372px;
  height: 72px;
  border-radius: 50px;
  border: 2px solid #FFF;
  overflow: hidden;
  margin: auto; /* 중앙 정렬 보장 */
`;

const ExpandBackground = keyframes`
  from {
    width: 48%;
  }
  to {
    width: 100%;
  }
`;

const ToggleButtonBackground = styled.div`
  position: absolute;
  top: 0;
  right: 0; /* 오른쪽에서 왼쪽으로 확장 */
  width: ${(props) => (props.hovered ? "100%" : "50%")};
  height: 100%;
  background: #FFF;
  transition: width 0.5s ease-in-out;
  border-radius: 50px;
`;

const ToggleButtonTextLeft = styled.div`
  position: absolute;
  z-index: 2;
  left: 0;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.hovered ? "#000" : "#FFF")};
  font-family: "Neue Haas Grotesk Text Pro";
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const ToggleButtonTextRight = styled.div`
  position: absolute;
  z-index: 2;
  right: 0;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  color: #000;
  font-family: "Neue Haas Grotesk Text Pro";
  font-size: 22px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const CircleMenu = styled.div`
  display: flex;
`;

const Circle1 = styled.div`
  width: 162px;
  height: 162px;
  border-radius: 50%;
  background: #FFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Circle2 = styled.div`
  width: 162px;
  height: 162px;
  border-radius: 50%;
  background: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid #FFF;
`;

const TitleSubWrapper = styled.div`
  align-items: flex-start;
`;

const TitleText1 = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 23px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  margin-right: 7px;
`;

const TitleText2 = styled.div`
  color: #FFF;
  font-family: Pretendard;
  font-size: 23px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  margin-right: 42px;
`;

const SubText1 = styled.div`
  position: relative; /* ::after의 위치 설정을 위해 추가 */
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  cursor: pointer;
  margin-top: 6px;

  &:hover {
    font-weight: 700;
  }

  &:hover::after {
    width: 100%; /* 밑줄이 전체로 확장 */
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0; /* 텍스트 아래에 밑줄 배치 */
    left: 0;
    width: 0; /* 초기 너비 */
    height: 2px; /* 밑줄 두께 */
    background-color: #000; /* 밑줄 색상 */
    transition: width 0.3s ease-in-out; /* 애니메이션 효과 */
  }
`;

const SubText2 = styled.div`
  position: relative; /* ::after의 위치 설정을 위해 추가 */
  color: #FFF;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  cursor: pointer;
  margin-top: 6px;

  &:hover {
    font-weight: 700;
  }

  &:hover::after {
    width: 100%; /* 밑줄이 전체로 확장 */
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0; /* 텍스트 아래에 밑줄 배치 */
    left: 0;
    width: 0; /* 초기 너비 */
    height: 2px; /* 밑줄 두께 */
    background-color: #FFF; /* 밑줄 색상 */
    transition: width 0.3s ease-in-out; /* 애니메이션 효과 */
  }
`;

const MovingAreaWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  position: relative;
  width: 100%;
  margin-left: 60px;
`;

const MovingArea = styled.div`
  display: flex;
  justify-content: center;
`;

const Ellipse = styled.div`
  width: 372px;
  height: 182px;
  border-radius: 90px;
  border: 2px solid #FFF;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 69px;
  gap: 14px;
  overflow: hidden;

  transition: all 0.3s ease-in-out;

  position: relative;

  &:hover {
    transform: scale(1.2);
    z-index: 10;
  }

  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
  }
`;

const StyledVideo = styled.video`
  filter: grayscale(100%);
`;

const LinkText = styled.div`
  position: relative;
  z-index: 2;
  display: flex; /* 텍스트와 아이콘을 가로로 배치 */
  align-items: center; /* 수직 중앙 정렬 */
  justify-content: space-between; /* 텍스트와 아이콘 간격 조정 */
  width: 100%; /* 전체 너비 사용 */

  color: #FFF;
  font-family: "Neue Haas Grotesk Text Pro";
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const ArrowIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const Logo = styled.img`
  width: 48px;
  height: 48px;
`;

export default MyPage;
