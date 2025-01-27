import React from "react";
import styled from "styled-components";

const InfoOverlay = ({ title, location, rating }) => {
  return (
    <OverlayContainer>
      <OverlayContent>
        <Title>{title}</Title>
        <Rating>⭐ {rating} | {location}</Rating>
      </OverlayContent>
    </OverlayContainer>
  );
};

const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 231px;
  height: 314px; /* ✅ 슬라이드 크기를 완전히 덮음 */
  border-radius: 5px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.50) 50%, #000 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* ✅ 내용이 아래에 정렬되도록 */
  align-items: center;
  padding-bottom: 20px; /* ✅ 하단 여백 */
  z-index: 5; /* ✅ 슬라이드 위에 표시 */
`;

const OverlayContent = styled.div`
  text-align: center;
  color: white;
`;

const Title = styled.strong`
  color: #FFF;
  font-family: "Pretendard Variable";
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: 35px; /* 159.091% */
  text-transform: uppercase;
`;

const Rating = styled.p`
  color: #BABABA;
  font-family: "Pretendard Variable";
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
  line-height: 50px; /* 384.615% */
`;

export default InfoOverlay;
