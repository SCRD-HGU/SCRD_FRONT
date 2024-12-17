import React, { useState } from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import LogoImage from "../assets/Logo.svg";
import RectangleImage from "../assets/Rectangle 8.svg";

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
                <TitleText1>
                  고객 센터
                </TitleText1>
                <SubText1>문의하기</SubText1>
                <SubText1>공지사항</SubText1>
                <SubText1>리뷰 일괄 입력</SubText1>
              </Circle1>
              <Circle2>
                <TitleText2>
                  더보기
                </TitleText2>
                <SubText2>ABOUT USCRD</SubText2>
                <SubText2>NEWS</SubText2>
                <SubText2>방탈출예약제휴</SubText2>
              </Circle2>
            </CircleMenu>
          </ButtonCircleWrapper>
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
  overflow: hidden;
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
    width: 0;
  }
  to {
    width: 100%;
  }
`;

const ToggleButtonBackground = styled.div`
  position: absolute;
  top: 0;
  right: 0; /* 오른쪽에서 왼쪽으로 확장 */
  width: ${(props) => (props.hovered ? "100%" : "0")};
  height: 100%;
  background: #FFF;
  animation: ${(props) => (props.hovered ? ExpandBackground : "none")} 0.5s forwards;
  transition: width 0.5s ease-out;
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
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  cursor: pointer;

  margin-top: 6px;

  &:hover {
    text-decoration: underline;
  }
`;

const SubText2 = styled.div`
  color: #FFF;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  cursor: pointer;

  margin-top: 6px;

  &:hover {
    text-decoration: underline;
  }
`;

const Logo = styled.img`
  width: 48px;
  height: 48px;
`;

export default MyPage;
