// ThemeSection.js
import React from "react";
import styled, { keyframes } from "styled-components";
import dongsan from "../assets/Theme.png";
import { IoTimeOutline } from "react-icons/io5";
import { PiPuzzlePieceFill } from "react-icons/pi";
import { RiKnifeBloodLine } from "react-icons/ri";
import { PiSneakerMoveFill } from "react-icons/pi";

const ThemeSection = () => {
  return (
    <>
      <ThemeInfo>
        <ThemeWrapper>
          <Theme src={dongsan} alt="머니머니 부동산" />
        </ThemeWrapper>
        <DetailInfo>
          <BasicInfo>
            <Title>머니머니 부동산</Title>
          </BasicInfo>
          <Branch>키이스케이프 | 스테이션점</Branch>
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
                  <span style={{ color: "#D90206", fontSize: "12px" }}>5</span>
                </PuzzleContainer>
              </Difficulty>
              <Rating>
                평점
                <RatingContainer>
                  <span style={{ color: "#FFF", fontSize: "12px", fontWeight: "700" }}>4.0</span>
                </RatingContainer>
              </Rating>
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
            {/* 예약하기 버튼은 여기서 제외 */}
          </Puzzle>
        </DetailInfo>
      </ThemeInfo>
      <Line />
    </>
  );
};

const ThemeInfo = styled.div`
  width: 1024px;
  display: flex;
  padding: 10px 37px;
  margin-top: 40px;
`;

const ThemeWrapper = styled.div`
  width: 183px;
  height: 180px;
  overflow: hidden;
`;

const Theme = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
`;

const DetailInfo = styled.div`
  width: 850px;
  margin-left: 40px;
`;

const BasicInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
`;

const Title = styled.div`
  color: #FFF;
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Branch = styled.div`
  color: #BABABA;
  font-family: Pretendard;
  font-size: 11px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  width: 100%;
  display: flex;
  align-items: flex-end;
  margin-top: 12px;
`;

const Semi = styled.div`
  width: 100%;
  display: flex;
  margin-top: 15px;
`;

const Local = styled.div`
  display: flex;
  width: 36.78px;
  padding: 4px 5px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 20px;
  border: 1px solid #FFF;
  background: #FFF;
  
  color: #000;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const RunningTime = styled.div`
  color: #FFF;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  margin-left: 21px;
  display: flex;
  align-items: center;
  svg {
    font-size: 20px;
    margin-right: 5px;
    color: #fff;
  }
`;

const Price = styled.div`
  color: #FFF;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  margin-top: 20px;
`;

const Puzzle = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: 17px;
`;

const Rest = styled.div`
  display: flex;
  align-items: center;
  gap: 23px;
`;

const Difficulty = styled.div`
  color: #BABABA;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PuzzleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  margin-top: 15px;
`;

const PuzzleIcon = styled(PiPuzzlePieceFill)`
  font-size: 15px;
  color: var(--foundation-red-normal-active, #d90206);
`;

const Rating = styled.div`
  color: #BABABA;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  margin-top: 15px;
`;

const Horror = styled.div`
  color: #BABABA;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const KnifeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 17px;
  height: 17px;
  background-color: #fff;
  border-radius: 50%;
  margin-top: 15px;
`;

const Knife = styled(RiKnifeBloodLine)`
  color: #000;
`;

const Activity = styled.div`
  color: #BABABA;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ShoeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 17px;
  height: 17px;
  background-color: #fff;
  border-radius: 50%;
  margin-top: 15px;
`;

const Shoe = styled(PiSneakerMoveFill)`
  color: #000;
`;

// 하단 구분선 (필요시)
const Line = styled.div`
  width: 960px;
  height: 2.5px;
  background-color: #9d9d9d;
  margin: 16px auto 0;
  border-radius: 1.25px;
`;

export default ThemeSection;
