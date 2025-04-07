import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { tokenState } from "../store/atom";
import Header from "../components/Header.js";
import Reservation from "../components/Reservation.js";
import Review from "../components/Review.js";
import { IoTimeOutline } from "react-icons/io5";
import { PiPuzzlePieceFill } from "react-icons/pi";
import { RiKnifeBloodLine } from "react-icons/ri";
import { PiSneakerMoveFill } from "react-icons/pi";
import LinesEllipsis from "react-lines-ellipsis";

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
  const { id } = useParams();
  const accessToken = useRecoilValue(tokenState);
  const [theme, setTheme] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/theme/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setTheme(res.data);
      } catch (err) {
        console.error("❌ 테마 정보 불러오기 실패:", err);
      }
    };

    if (accessToken) fetchTheme();
  }, [id, accessToken]);

  if (!theme) return <div style={{ color: "#fff" }}>로딩 중...</div>;

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header />
        <ThemeInfo>
          <ThemeWrapper>
            <Theme src={theme.image} alt={theme.title} />
          </ThemeWrapper>
          <DetailInfo>
            <BasicInfo>
              <Title>{theme.title}</Title>
              <Branch>{theme.brand} | {theme.branch}</Branch>
            </BasicInfo>
            <Semi>
              <Local>{theme.location}</Local>
              <RunningTime>
                <IoTimeOutline />
                {theme.playtime}분
              </RunningTime>
            </Semi>
            <Price>{theme.price.toLocaleString()}원</Price>
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
                    <span style={{ color: "#FFF", fontSize: "15px", fontWeight: "700" }}>
                      {Number(theme.rating).toFixed(1)}
                    </span>
                  </RatingContainer>
                </Rating>
                <Device>
                  장치 비율
                  <DeviceContainer>
                    <span style={{ color: "#FFF", fontSize: "15px", fontWeight: "700" }}>
                      7:3
                    </span>
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
              <FullScript>{theme.description}</FullScript>
              <ToggleButton onClick={() => setExpanded(false)}>접기</ToggleButton>
            </>
          ) : (
            <LinesEllipsis
              text={theme.description}
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

// 💅 styled-components (기존과 동일, 중복 생략 가능하지만 요청에 따라 유지)

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