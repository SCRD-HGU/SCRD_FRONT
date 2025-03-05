import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { CSSTransition } from "react-transition-group";
import { PiPuzzlePieceFill } from "react-icons/pi";
import { RiKnifeBloodLine } from "react-icons/ri";
import { PiSneakerMoveFill } from "react-icons/pi";

/** 
 * 0) 슬라이드 애니메이션 전역 스타일
 *    - slide-enter, slide-enter-active, slide-exit, slide-exit-active를 정의
 */
const SlideTransitionStyles = createGlobalStyle`
  .slide-enter {
    max-height: 0;
    overflow: hidden;
  }
  .slide-enter.slide-enter-active {
    max-height: 2000px; /* 충분히 큰 값 */
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
 * 1) 더미 데이터 (ID가 높을수록 "가장 최근" 리뷰)
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
 * 2) 전체 리뷰 섹션
 */
function ReviewSection() {
  const [showAllReviews, setShowAllReviews] = useState(false);

  // ID 내림차순 (가장 최근이 맨 앞)
  const sortedReviews = [...dummyReviews].sort((a, b) => b.id - a.id);

  // 최근 2개, 나머지
  const recentReviews = sortedReviews.slice(0, 2);
  const restReviews = sortedReviews.slice(2);

  return (
    <SectionContainer>
      {/* 슬라이드 전역 스타일 삽입 */}
      <SlideTransitionStyles />

      <SectionTitle>리뷰</SectionTitle>

      {/* 항상 보이는 "최근 2개" */}
      {recentReviews.map((review) => (
        <React.Fragment key={review.id}>
          <ReviewItem review={review} />
          <Line />
        </React.Fragment>
      ))}

      {/* 나머지 리뷰들: CSSTransition으로 슬라이드 */}
      <CSSTransition
        in={showAllReviews}       // true면 enter, false면 exit
        timeout={300}            // 300ms
        classNames="slide"       // 위에서 정의한 .slide-xxx
        unmountOnExit            // exit 후 DOM 제거
      >
        <div>
          {restReviews.map((review) => (
            <React.Fragment key={review.id}>
              <ReviewItem review={review} />
              <Line />
            </React.Fragment>
          ))}
        </div>
      </CSSTransition>

      {/* 버튼: showAllReviews 토글 */}
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

/**
 * 3) 리뷰 아이템 (UI 그대로)
 */
function ReviewItem({ review }) {
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
        <UserInfo>{userName}</UserInfo>
        <MetaInfo>
          <span>{success ? "성공" : "실패"}</span>
          <span>|</span>
          <span>힌트 {hintCount}개</span>
          <span>|</span>
          <span>{clearTime}</span>
        </MetaInfo>
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

      <TagWrapper>
        {tags.map((tag, index) => (
          <TagItem key={index}>{tag}</TagItem>
        ))}
      </TagWrapper>

      <Content>{content}</Content>
    </ReviewCard>
  );
}

export default ReviewSection;

/**
 * 4) 스타일 정의 (styled-components)
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
  line-height: normal;
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

const UserInfo = styled.span`
  color: #FFF;
  font-family: Pretendard;
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-right: 8px;
`;

const MetaInfo = styled.span`
  display: inline-flex;
  gap: 30px;
  margin-right: 8px;
  margin-left: 55px;

  color: #C9C9C9;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const Rest = styled.span`
  margin-left: auto;
  margin-right: 77px;
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
  border-radius: 50%;
  background-color: ${({ horror }) => (horror ? "#FFF" : "#5B5B5B")};
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
  border-radius: 50%;
  background-color: ${({ activity }) => (activity ? "#FFF" : "#5B5B5B")};
`;

const Shoe = styled(PiSneakerMoveFill)`
  flex-shrink: 0;
  color: #000;
`;

const Content = styled.div`
  margin-bottom: 8px;
  color: #FFF;
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
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
  font-style: normal;
  font-weight: 700;
  line-height: normal;
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
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Line = styled.div`
  width: 960px;
  height: 1px;
  background-color: #9d9d9d;
  border-radius: 1.25px;
  margin-bottom: 35px;
  margin-top: 35px;
`;