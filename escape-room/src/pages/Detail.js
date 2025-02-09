import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import Header from "../components/Header.js";
import dongsan from "../assets/Theme.png";
import { IoTimeOutline } from "react-icons/io5";
import { PiPuzzlePieceFill } from "react-icons/pi";
import { RiKnifeBloodLine } from "react-icons/ri";
import { PiSneakerMoveFill } from "react-icons/pi";

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
  return (
    <>
    <GlobalStyle />
    <Container>
      <Header />
      <ThemeImage />
      <DetailInfo>
        <BasicInfo>
          <Title>머니머니 부동산</Title>
          <Branch>키이스케이프 | 스테이션점</Branch>
          <Price>30,000원</Price>
        </BasicInfo>
        <Semi>
          <Local>
            강남
          </Local>
          <RunningTime>
            <IoTimeOutline />
            80분
          </RunningTime>
        </Semi>
        <Puzzle>
          <Rest>
          <Difficulty>
            난이도
            <PuzzleContainer>
              <PuzzleIcon />
              <span style={{ color: "#D90206", fontSize: "15px" }}>5</span>
            </PuzzleContainer>
          </Difficulty>
            <Device>
              장치비율
              <span style={{ color: "#FFF", fontSize: "15px", fontWeight: "700" }}>7:3</span>
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
          <ReserveButton>
            에약하기
          </ReserveButton>
        </Puzzle>
        <Script>
          안녕하세요, 어른이 여러분. 오랜만에 우리 어른이 여러분들을 위해서 새로운 주제를 들고 왔는데, 뭘까~요?<br />
          짜잔! 바로바로 키이스케이프사에서 야심 차게 출시한 시즌 2 '머니머니 부. 동. 산!  울고 싶을 만큼 혹독한 세상에서도<br />
          이왕이면 내 건물 안에서 우는 게 나으니까! 본격 머니머니 르와 자본주의의 꽃, 부동산의 콜라보.<br />
          지금 바로 주문하세요!
        </Script>
      </DetailInfo>
      <Reservation>

      </Reservation>
      <Review>

      </Review>
      <Buttons>

      </Buttons>
    </Container>
    </>
  )
}

const Container = styled.div`
  width: 1037px;
  height: 100%;
  background: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ThemeImage = styled.div`
  width: 1034px;
  height: 305px;
  border-radius: 5px; /* 모서리를 둥글게 */
  
  background: 
    linear-gradient(0deg, #000 0%, rgba(0, 0, 0, 0.00) 100%), /* 검정색 그라디언트 */
    url(${dongsan}) lightgray 0px 2.798px / 100% 336.924% no-repeat; /* 이미지 적용 */
  
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
`;



const DetailInfo = styled.div`
`;

const BasicInfo = styled.div`
  width: 1024px;
  display: flex;
  align-items: flex-end;
  padding: 10px 36px;
`;

const Title = styled.div`
  color: #FFF;
  font-family: "Pretendard Variable";
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: 35px;
  text-transform: uppercase;
`;

const Branch = styled.div`
  color: #BABABA;
  font-family: "Pretendard Variable";
  font-size: 13px;
  font-style: normal;
  font-weight: 700;

  margin-left: 22px;
`;

const Price = styled.div`
  color: #FFF;
  font-family: Pretendard;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  margin-left: 412px;
`;

const Semi = styled.div`
  width: 1024px;
  display: flex;
  padding: 10px 36px;
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
  border: 1px solid #FFF;
  background: #FFF;

  color: #000;
  font-family: "Pretendard Variable";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const RunningTime = styled.div`
  color: #FFF;
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
    color: #FFF;
  }
`;

const Puzzle = styled.div`
  width: 1024px;
  display: flex;
  padding: 0px 36px;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 17px;
`;

const Rest = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  gap: 53px;
`;

const Difficulty = styled.div`
  color: #BABABA;
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

const PuzzleContainer = styled.div`
  display: flex;
  align-items: center; /* 퍼즐 아이콘과 숫자 중앙 정렬 */
  gap: 3px; /* 퍼즐 아이콘과 숫자 사이 간격 */
  margin-top: 15px;
`;

const PuzzleIcon = styled(PiPuzzlePieceFill)`
  font-size: 18px;
  color: var(--foundation-red-normal-active, #D90206);
`;

const Device = styled.div`
  color: #BABABA;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  display: flex;
  flex-direction: column; /* 세로 정렬 */
  align-items: center; /* 가운데 정렬 */
  justify-content: center; /* 수직 가운데 정렬 */
  gap: 10px; /* 텍스트와 값 간격 */
`;

const Horror = styled.div`
  color: #BABABA;
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
  align-items: center; /* 퍼즐 아이콘과 숫자 중앙 정렬 */
  justify-content: center;
  gap: 3px; /* 퍼즐 아이콘과 숫자 사이 간격 */
  margin-top: 15px;

  width: 20.367px;
  height: 20.367px;
  background-color: #FFF;
  border-radius: 50%;
`;

const Knife = styled(RiKnifeBloodLine)`
  flex-shrink: 0;
  color: #000;
`;

const Activity = styled.div`
  color: #BABABA;
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
  align-items: center; /* 퍼즐 아이콘과 숫자 중앙 정렬 */
  justify-content: center;
  gap: 3px; /* 퍼즐 아이콘과 숫자 사이 간격 */
  margin-top: 15px;

  width: 20.367px;
  height: 20.367px;
  background-color: #FFF;
  border-radius: 50%;
`;

const Shoe = styled(PiSneakerMoveFill)`
  flex-shrink: 0;
  color: #000;
`;

const ReserveButton = styled.button`
  width: 153px;
  height: 65px;
  flex-shrink: 0;
  fill: #FFF;
  backdrop-filter: blur(2px);
  border-radius: 50px;

  color: var(--foundation-red-normal-active, #D90206);
  font-family: Pretendard;
  font-size: 21px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Script = styled.div`
  color: #FFF;
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 25px; /* 147.059% */

  width: 1024px;
  display: flex;
  padding: 0 36px;
  margin-top: 38px;
`;

const Reservation = styled.div`
`;

const Review = styled.div`
`;

const Buttons = styled.div`
`;

export default Detail;