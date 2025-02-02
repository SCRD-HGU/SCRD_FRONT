import React from "react";
import styled from "styled-components";

const Card = ({ item }) => {
  return (
    <CardWrapper height={item.height}>
      <Thumbnail />
      <Title>{item.title}</Title>
      <Tags>
        <Tag>{item.tag}</Tag>
        <Difficulty>{item.difficulty}</Difficulty>
      </Tags>
    </CardWrapper>
  );
};

export default Card;

const CardWrapper = styled.div`
  background: #000;
  padding: 15px;
  border-radius: 8px;
  color: white;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  grid-row: span ${({ height }) => height || 1}; /* 카드별 높이 조정 */
`;

const Thumbnail = styled.div`
  width: 100%;
  height: 100px;
  background: gray;
  border-radius: 4px;
`;

const Title = styled.h3`
  font-size: 18px;
  margin: 10px 0;
`;

const Tags = styled.div`
  display: flex;
  gap: 8px;
`;

const Tag = styled.span`
  background: red;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
`;

const Difficulty = styled.span`
  background: black;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
`;
