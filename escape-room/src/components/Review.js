import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { CSSTransition } from "react-transition-group";
import { PiPuzzlePieceFill } from "react-icons/pi";
import { RiKnifeBloodLine } from "react-icons/ri";
import { PiSneakerMoveFill } from "react-icons/pi";
import ReviewImage from "../assets/ReviewImage.svg";

/** 
 * 0) 슬라이드 애니메이션 전역 스타일
 */
const SlideTransitionStyles = createGlobalStyle`
  .slide-enter {
    max-height: 0;
    overflow: hidden;
  }
  .slide-enter.slide-enter-active {
    max-height: 2000px;
    transition: max-height 300ms ease;
  }
  .slide-exit {
    max-height: 2000px;
    overflow: hidden;
  }
  .slide-exit.slide-exit-active {
    max-height: 0;
    transition: max-height 300ms ease;
  }
`;

/** 
 * 1) 더미 데이터
 */
const dummyReviews = [
  {
    id: 1,
    userName: "oldUser01(tier1)",
    success: false,
    hintCount: 1,
    clearTime: "90분 / 120분",
    rating: 2.0,
    difficulty: 3,
    horror: false,
    activity: false,
    content: "첫 번째 오래된 리뷰 내용...",
    tags: ["#오래된", "#초보자용"],
  },
  {
    id: 2,
    userName: "oldUser02(tier2)",
    success: true,
    hintCount: 2,
    clearTime: "80분 / 90분",
    rating: 3.5,
    difficulty: 4,
    horror: false,
    activity: true,
    content: "두 번째 오래된 리뷰 내용...",
    tags: ["#보통난이도", "#중간스포"],
  },
  {
    id: 3,
    userName: "midUser03(tier2)",
    success: true,
    hintCount: 3,
    clearTime: "70분 / 75분",
    rating: 4.0,
    difficulty: 4,
    horror: true,
    activity: false,
    content: "세 번째 중간 시점 리뷰 내용...",
    tags: ["#감정적인", "#퀴즈요", "#추리빨간", "#스포일러는", "#미스터리함"],
  },
  {
    id: 4,
    userName: "saint03(tier3)",
    success: true,
    hintCount: 2,
    clearTime: "60분 35초 / 75분",
    rating: 4.5,
    difficulty: 5,
    horror: true,
    activity: true,
    content: "네 번째(최근) 리뷰 내용...",
    tags: ["#재밌었음", "#미스터리", "#힐링"],
  },
  {
    id: 5,
    userName: "saint03(tier3)",
    success: true,
    hintCount: 3,
    clearTime: "50분 / 75분",
    rating: 4.0,
    difficulty: 5,
    horror: false,
    activity: true,
    content: "다섯 번째(가장 최근) 리뷰 내용...",
    tags: ["#감정적인", "#퀴즈요", "#추리빨간", "#스포일러는", "#미스터리함"],
  },
];

/** 
 * 2) 리뷰 아이템
 *    - useImageVersion = false (기본): userName + MetaInfo (가로 배치)
 *    - useImageVersion = true  (두 번째 버전): ReviewImage(왼쪽) + (오른쪽) Title/Branch/MetaInfo(수직)
 */
function ReviewItem({ review, useImageVersion = false }) {
  const {
    userName,
    success,
    hintCount,
    clearTime,
    rating,
    difficulty,
    horror,
    activity,
    content,
    tags,
  } = review;

  return (
    <ReviewCard>
      <Header>
        {useImageVersion ? (
          // === [두 번째 버전] 이미지 왼쪽, 오른쪽에 (테마명/지점/MetaInfo) 수직 정렬
          <LeftRow>
            <UserImage src={ReviewImage} alt="Review" />
            <LeftStack>
              <Title>머니머니 부동산</Title>
              <Branch>키이스케이프 | 스테이션점</Branch>
              <MetaInfo style={{ marginLeft: 0 }}>
                <span>{success ? "성공" : "실패"}</span>
                <span>|</span>
                <span>힌트 {hintCount}개</span>
                <span>|</span>
                <span>{clearTime}</span>
              </MetaInfo>
            </LeftStack>
          </LeftRow>
        ) : (
          // === [기본 버전] userName + MetaInfo (가로 배치)
          <>
            <UserInfo>{userName}</UserInfo>
            <MetaInfo>
              <span>{success ? "성공" : "실패"}</span>
              <span>|</span>
              <span>힌트 {hintCount}개</span>
              <span>|</span>
              <span>{clearTime}</span>
            </MetaInfo>
          </>
        )}

        {/* 오른쪽 (난이도, 평점, 공포도, 활동성) */}
        <Rest>
          <Difficulty>
            난이도
            <PuzzleContainer>
              <PuzzleIcon />
              <span style={{ color: "#D90206", fontSize: "15px" }}>
                {difficulty}
              </span>
            </PuzzleContainer>
          </Difficulty>
          <Rating>
            평점
            <RatingContainer>
              <span style={{ color: "#FFF", fontSize: "17px", fontWeight: "700" }}>
                {rating}
              </span>
            </RatingContainer>
          </Rating>
          <Horror>
            공포도
            <KnifeContainer horror={horror}>
              <Knife />
            </KnifeContainer>
          </Horror>
          <Activity>
            활동성
            <ShoeContainer activity={activity}>
              <Shoe />
            </ShoeContainer>
          </Activity>
        </Rest>
      </Header>

      {/* 태그 */}
      <TagWrapper>
        {tags.map((tag, index) => (
          <TagItem key={index}>{tag}</TagItem>
        ))}
      </TagWrapper>

      {/* 리뷰 내용 */}
      <Content>{content}</Content>
    </ReviewCard>
  );
}

/**
 * 3) 전체 리뷰 섹션
 */
function ReviewSection({ useImageVersion = false }) {
  const [showAllReviews, setShowAllReviews] = useState(false);

  const sortedReviews = [...dummyReviews].sort((a, b) => b.id - a.id);
  const recentReviews = sortedReviews.slice(0, 2);
  const restReviews = sortedReviews.slice(2);

  return (
    <SectionContainer>
      <SlideTransitionStyles />
      <SectionTitle>리뷰</SectionTitle>

      {recentReviews.map((review) => (
        <React.Fragment key={review.id}>
          <ReviewItem review={review} useImageVersion={useImageVersion} />
          <Line />
        </React.Fragment>
      ))}

      <CSSTransition
        in={showAllReviews}
        timeout={300}
        classNames="slide"
        unmountOnExit
      >
        <div>
          {restReviews.map((review) => (
            <React.Fragment key={review.id}>
              <ReviewItem review={review} useImageVersion={useImageVersion} />
              <Line />
            </React.Fragment>
          ))}
        </div>
      </CSSTransition>

      {showAllReviews ? (
        <AllReviewButton onClick={() => setShowAllReviews(false)}>
          접기
        </AllReviewButton>
      ) : (
        <AllReviewButton onClick={() => setShowAllReviews(true)}>
          전체 리뷰
        </AllReviewButton>
      )}
    </SectionContainer>
  );
}

export default ReviewSection;

/** 
 * 4) 스타일 정의
 */
const SectionContainer = styled.div`
  width: 1034px;
  margin-top: 96px;
  padding: 0 36px;
`;

const SectionTitle = styled.h2`
  color: #FFF;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  margin-bottom: 38px;
`;

const ReviewCard = styled.div`
  background: transparent;
  margin-bottom: 16px;
  border-radius: 8px;
`;

const Header = styled.div`
  margin-bottom: 18px;
  display: flex;
  align-items: center;
`;

/** 
 * [두 번째 버전]에서 
 * - 왼쪽에 이미지, 오른쪽에 (Title + Branch + MetaInfo) 수직으로 쌓기 위한 컨테이너
 */
const LeftRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px; /* 이미지와 텍스트 사이 간격 */
`;

const UserImage = styled.img`
  width: 75px;
  height: 75px;
  border-radius: 50%;
  margin-right: 30px;
`;

/** 왼쪽 텍스트 부분(Title + Branch + MetaInfo)을 수직으로 쌓는 컨테이너 */
const LeftStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px; /* 항목 간 간격 */
`;

const Title = styled.div`
  color: #fff;
  font-family: "Inter";
  font-size: 20px;
  font-weight: 700;
  line-height: 35px;
  text-transform: uppercase;
`;

const Branch = styled.div`
  color: #bababa;
  font-family: "Pretendard Variable";
  font-size: 13px;
  font-weight: 700;
`;

/** [기본 버전]에서 userName을 보여주기 위한 스타일 */
const UserInfo = styled.span`
  color: #FFF;
  font-family: Pretendard;
  font-size: 13px;
  font-weight: 700;
  margin-right: 8px;
`;

const MetaInfo = styled.span`
  display: inline-flex;
  gap: 30px;
  margin-left: 55px; /* 기본 코드 유지 */
  color: #C9C9C9;
  font-family: Pretendard;
  font-size: 15px;
  font-weight: 600;
`;

const Rest = styled.span`
  margin-left: auto;
  margin-right: 77px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 23px;
`;

const Difficulty = styled.div`
  color: #bababa;
  font-family: Pretendard;
  font-size: 15px;
  font-weight: 700;
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
  font-size: 18px;
  color: var(--foundation-red-normal-active, #d90206);
`;

const Rating = styled.div`
  color: #bababa;
  font-family: Pretendard;
  font-size: 15px;
  font-weight: 700;
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
  color: #bababa;
  font-family: Pretendard;
  font-size: 15px;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const KnifeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  margin-top: 15px;
  width: 20.367px;
  height: 20.367px;
  border-radius: 50%;
  background-color: ${({ horror }) => (horror ? "#FFF" : "#5B5B5B")};
`;

const Knife = styled(RiKnifeBloodLine)`
  color: #000;
`;

const Activity = styled.div`
  color: #bababa;
  font-family: Pretendard;
  font-size: 15px;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ShoeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  margin-top: 15px;
  width: 20.367px;
  height: 20.367px;
  border-radius: 50%;
  background-color: ${({ activity }) => (activity ? "#FFF" : "#5B5B5B")};
`;

const Shoe = styled(PiSneakerMoveFill)`
  color: #000;
`;

const TagWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

const TagItem = styled.span`
  background-color: #333;
  padding: 4px 8px;
  border-radius: 4px;
  color: #D8D8D8;
  font-family: Pretendard;
  font-size: 15px;
  font-weight: 700;
`;

const Content = styled.div`
  margin-bottom: 8px;
  color: #FFF;
  font-family: Inter;
  font-size: 13px;
  font-weight: 400;
`;

const AllReviewButton = styled.button`
  display: block;
  margin: 20px auto 0;
  padding: 10px 20px;
  cursor: pointer;
  background: transparent;
  border: none;
  color: var(--foundation-red-normal-active, #D90206);
  font-family: Pretendard;
  font-size: 15px;
  font-weight: 700;
`;

const Line = styled.div`
  width: 960px;
  height: 1px;
  background-color: #9d9d9d;
  border-radius: 1.25px;
  margin-bottom: 35px;
  margin-top: 35px;
`;