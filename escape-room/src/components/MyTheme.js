import React from "react";
import styled from "styled-components";
import dongsan from "../assets/Theme.png";
import { IoTimeOutline } from "react-icons/io5";
import { PiPuzzlePieceFill } from "react-icons/pi";
import { RiKnifeBloodLine } from "react-icons/ri";
import { PiSneakerMoveFill } from "react-icons/pi";

const ThemeSection = () => {
  // ✅ 더미 데이터 (활동성과 공포도는 true/false로 설정)
  const themeData = [
    { id: 1, title: "머니머니 부동산", branch: "키이스케이프 | 스테이션점", local: "강남", time: 80, price: 30000, difficulty: 5, rating: 4.0, activity: true, horror: false },
    { id: 2, title: "머니머니 부동산", branch: "키이스케이프 | 스테이션점", local: "강남", time: 80, price: 30000, difficulty: 5, rating: 4.0, activity: false, horror: true },
    { id: 3, title: "머니머니 부동산", branch: "키이스케이프 | 스테이션점", local: "강남", time: 80, price: 30000, difficulty: 5, rating: 4.0, activity: false, horror: false },
    { id: 4, title: "머니머니 부동산", branch: "키이스케이프 | 스테이션점", local: "강남", time: 80, price: 30000, difficulty: 5, rating: 4.0, activity: true, horror: true }
  ];

  return (
    <ThemesContainer>
      {themeData.map((theme) => (
        <ThemeInfo key={theme.id}>
          <ThemeWrapper>
            <Theme src={dongsan} alt={theme.title} />
          </ThemeWrapper>
          <DetailInfo>
            <BasicInfo>
              <Title>{theme.title}</Title>
            </BasicInfo>
            <Branch>{theme.branch}</Branch>
            <Semi>
              <Local>{theme.local}</Local>
              <RunningTime>
                <IoTimeOutline />
                {theme.time}분
              </RunningTime>
            </Semi>
            <Price>{theme.price.toLocaleString()}원</Price>
            <Puzzle>
              <Rest>
                <Difficulty>
                  난이도
                  <PuzzleContainer>
                    <PuzzleIcon />
                    <span style={{ color: "#D90206", fontSize: "12px" }}>{theme.difficulty}</span>
                  </PuzzleContainer>
                </Difficulty>
                <Rating>
                  평점
                  <RatingContainer>
                    <span style={{ color: "#FFF", fontSize: "12px", fontWeight: "700" }}>{theme.rating.toFixed(1)}</span>
                  </RatingContainer>
                </Rating>
                <Horror>
                  공포도
                  <KnifeContainer $isActive={theme.horror}>
                    <Knife $isActive={theme.horror} />
                  </KnifeContainer>
                </Horror>
                <Activity>
                  활동성
                  <ShoeContainer $isActive={theme.activity}>
                    <Shoe $isActive={theme.activity} />
                  </ShoeContainer>
                </Activity>
              </Rest>
            </Puzzle>
          </DetailInfo>
        </ThemeInfo>
      ))}
    </ThemesContainer>
  );
};

/** ✅ 부모 컨테이너 */
const ThemesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 900px;
  margin: 0 auto;
`;

/** ✅ 개별 카드 */
const ThemeInfo = styled.div`
  display: flex;
  width: 420px;
  margin-bottom: 68px;
  background-color: transparent;
`;

const ThemeWrapper = styled.div`
  width: 183.9px;
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
  margin-left: 46px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BasicInfo = styled.div`
  display: flex;
  align-items: flex-end;
`;

const Title = styled.div`
  color: #fff;
  font-size: 16px;
  font-weight: 700;
`;

const Branch = styled.div`
  margin-top: 8px;
  color: #bababa;
  font-size: 12px;
  font-weight: 600;
`;

const Semi = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: center;
`;

const Local = styled.div`
  padding: 4px 6px;
  border-radius: 12px;
  border: 1px solid #fff;
  background: #fff;
  color: #000;
  font-size: 10px;
  font-weight: 700;
`;

const RunningTime = styled.div`
  margin-left: 12px;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  svg {
    font-size: 18px;
    margin-right: 5px;
  }
`;

const Price = styled.div`
  margin-top: 16px;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
`;

const Puzzle = styled.div`
  margin-top: 14px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const Rest = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Difficulty = styled.div`
  color: #bababa;
  font-size: 10px;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PuzzleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  margin-top: 10px;
`;

const PuzzleIcon = styled(PiPuzzlePieceFill)`
  font-size: 14px;
  color: #d90206;
`;

const Rating = styled.div`
  color: #bababa;
  font-size: 10px;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RatingContainer = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 3px;
`;

/** ✅ 공포도 & 활동성 아이콘 색상 변경 */
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
  color: ${(props) => (props.$isActive ? "#000" : "#5B5B5B")};
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
  color: ${(props) => (props.$isActive ? "#000" : "#5B5B5B")};
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

export default ThemeSection;
