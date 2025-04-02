import React, { useState } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import Header from "../components/Header.js";
import Reservation from "../components/Reservation.js";
import Review from "../components/Review.js";
import dongsan from "../assets/Theme.png";
import { IoTimeOutline } from "react-icons/io5";
import { PiPuzzlePieceFill } from "react-icons/pi";
import { RiKnifeBloodLine } from "react-icons/ri";
import { PiSneakerMoveFill } from "react-icons/pi";
import LinesEllipsis from "react-lines-ellipsis"; // 라이브러리 import

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
  const [expanded, setExpanded] = useState(false);
  const themeDescription = `안녕하세요, 어른이 여러분. 오랜만에 우리 어른이 여러분들을 위해서 새로운 주제를 들고 왔는데, 뭘까~요?
짜잔! 바로바로 키이스케이프사에서 야심 차게 출시한 시즌 2 '머니머니 부. 동. 산! 울고 싶을 만큼 혹독한 세상에서도
이왕이면 내 건물 안에서 우는 게 나으니까! 본격 머니머니 르와 자본주의의 꽃, 부동산의 콜라보.
지금 바로 주문하세요!`;

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header />
        <ThemeInfo>
          <ThemeWrapper>
            <Theme src={dongsan} alt="머니머니 부동산" />
          </ThemeWrapper>
          <DetailInfo>
            <BasicInfo>
              <Title>머니머니 부동산</Title>
              <Branch>키이스케이프 | 스테이션점</Branch>
            </BasicInfo>
            <Semi>
              <Local>강남</Local>
              <RunningTime>
                <IoTimeOutline />
                80분
              </RunningTime>
            </Semi>
            <Price>30,000원</Price>
            <Puzzle>
              <Rest>
                <Difficulty>
                  난이도
                  <PuzzleContainer>
                    <PuzzleIcon />
                    <span style={{ color: "#D90206", fontSize: "15px" }}>5</span>
                  </PuzzleContainer>
                </Difficulty>
                <Rating>
                  평점
                  <RatingContainer>
                    <span style={{ color: "#FFF", fontSize: "15px", fontWeight: "700" }}>4.0</span>
                  </RatingContainer>
                </Rating>
                <Device>
                  장치 비율
                  <DeviceContainer>
                    <span style={{ color: "#FFF", fontSize: "15px", fontWeight: "700" }}>7:3</span>
                  </DeviceContainer>
                </Device>
                <Horror>
                  공포도
                  <KnifeContainer>
                    <Knife />
                  </KnifeContainer>
                </Horror>
                <Activity>
                  활동성
                  <ShoeContainer>
                    <Shoe />
                  </ShoeContainer>
                </Activity>
              </Rest>
              <ReserveButton>예약하기</ReserveButton>
            </Puzzle>
          </DetailInfo>
        </ThemeInfo>
        <Line />
        <Script>
          테마 설명
          {expanded ? (
            <>
              <FullScript>{themeDescription}</FullScript>
              <ToggleButton onClick={() => setExpanded(false)}>접기</ToggleButton>
            </>
          ) : (
            <LinesEllipsis
              text={themeDescription}
              maxLine="2"
              ellipsis={
                <span>
                  ... <ToggleButton onClick={() => setExpanded(true)}>더보기</ToggleButton>
                </span>
              }
              trimRight
              basedOn="letters"
              component="p"
              style={{
                color: "#929292",
                fontFamily: "Inter",
                fontSize: "17px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "1.4em",
                marginTop: "30px",
              }}
            />
          )}
        </Script>
        <Reservation />
        <Review />
        <Buttons>
          <Other>다른 테마 보기</Other>
          <Save>저장하기</Save>
        </Buttons>
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

const ThemeInfo = styled.div`
  width: 1024px;
  display: flex;
  padding: 10px 37px;
  margin-top: 150px;
`;

const DetailInfo = styled.div`
  width: 850px;
`;

const ThemeWrapper = styled.div`
  width: 260px;
  height: 268px;
  overflow: hidden;
`;

const Theme = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
`;

const BasicInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  padding: 10px 37px;
`;

const Title = styled.div`
  color: #fff;
  font-family: "Pretendard Variable";
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: 35px;
  text-transform: uppercase;
`;

const Branch = styled.div`
  color: #bababa;
  font-family: "Pretendard Variable";
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
  margin-left: 22px;
`;

const Price = styled.div`
  color: #fff;
  font-family: Pretendard;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  width: 100%;
  margin-top: 56px;
  padding: 0 37px;
`;

const Semi = styled.div`
  width: 100%;
  display: flex;
  padding: 10px 37px;
`;

const Local = styled.div`
  display: flex;
  width: 54px;
  padding: 4px 5px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 20px;
  border: 1px solid #fff;
  background: #fff;
  color: #000;
  font-family: "Pretendard Variable";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const RunningTime = styled.div`
  color: #fff;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  margin-left: 21px;
  display: flex;
  align-items: center;
  svg {
    font-size: 24px;
    margin-right: 5px;
    color: #fff;
  }
`;

const Puzzle = styled.div`
  width: 100%;
  display: flex;
  padding: 0px 37px;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: 17px;
`;

const Rest = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 23px;
`;

const Difficulty = styled.div`
  color: #bababa;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Rating = styled.div`
  color: #bababa;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  margin-top: 15px;
`;

const PuzzleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  margin-top: 15px;
`;

const PuzzleIcon = styled(PiPuzzlePieceFill)`
  font-size: 18px;
  color: var(--foundation-red-normal-active, #d90206);
`;

const Device = styled.div`
  color: #bababa;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DeviceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  margin-top: 15px;
`;

const Horror = styled.div`
  color: #bababa;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const KnifeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  margin-top: 15px;
  width: 20.367px;
  height: 20.367px;
  background-color: #fff;
  border-radius: 50%;
`;

const Knife = styled(RiKnifeBloodLine)`
  flex-shrink: 0;
  color: #000;
`;

const Activity = styled.div`
  color: #bababa;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ShoeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  margin-top: 15px;
  width: 20.367px;
  height: 20.367px;
  background-color: #fff;
  border-radius: 50%;
`;

const Shoe = styled(PiSneakerMoveFill)`
  flex-shrink: 0;
  color: #000;
`;

// 1. shimmer 애니메이션 정의
const shimmer = keyframes`
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
`;

const ReserveButton = styled.div`
  width: 135px;
  height: 36px;
  flex-shrink: 0;
  /* 폰트 관련 스타일 */
  font-family: Inter;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  /* 반짝이 효과를 위한 그라디언트 배경 */
  background: linear-gradient(
    to right,
    #d4d4d4 0%,
    #ffffff 20%,
    #d4d4d4 40%,
    #d4d4d4 100%
  );
  background-size: 200% auto;

  /* 텍스트만 그라디언트가 보이도록 설정 */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent; /* 텍스트 색상 투명화 */

  /* 애니메이션 적용 */
  animation: ${shimmer} 2s linear infinite;
`;

const Line = styled.div`
  width: 960px;
  height: 2.5px;
  background-color: #9d9d9d;
  margin: 16px auto 0;
  border-radius: 1.25px;
`;

const Script = styled.div`
  color: #fff;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  width: 960px;
  margin-top: 21px;
`;

const FullScript = styled.p`
  color: #929292;
  font-family: Inter;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 1.4em;
  margin-top: 30px;
`;

const ToggleButton = styled.span`
  color: #fff;
  font-family: Inter;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  cursor: pointer;
  margin-left: 5px;
`;

const Buttons = styled.div`
  width: 960px;
  margin-bottom: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 34px;
`;

const Other = styled.div`
  display: flex;
  width: 223px;
  height: 79px;
  padding: 23px 48px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 60px;
  border: 2.5px solid #FFF;
  backdrop-filter: blur(2px);

  color: #FFF;
  font-family: Pretendard;
  font-size: 23px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  white-space: nowrap;
`;

const Save = styled.div`
  display: flex;
  width: 223px;
  height: 79px;
  padding: 23px 48px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 60px;
  background: #FFF;
  backdrop-filter: blur(2px);

  color: var(--foundation-red-normal-active, #D90206);
  font-family: Pretendard;
  font-size: 23px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export default Detail;