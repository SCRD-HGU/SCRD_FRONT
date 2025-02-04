import React from "react";
import styled from "styled-components";
import Puzzle from "../assets/puzzle.svg";

const InfoOverlay = ({ title, rating, location, branch }) => {
  return (
    <OverlayContainer>
      <Info>
        <Title>{title}</Title>
        <SubInfo>
          <Rating>
            <PuzzleIcon src={Puzzle} alt="Rating Icon" />
            {rating}
          </Rating>
          <Location>{location}</Location>
          <Icon>
          </Icon>
        </SubInfo>
        <Branch>{branch}</Branch>
      </Info>
    </OverlayContainer>
  );
};

const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 231px;
  height: 314px;
  border-radius: 5px;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.00) 0%,
    rgba(0, 0, 0, 0.50) 50%,
    #000 100%
  );
  z-index: 5;
`;

const Info = styled.div`
  position: absolute;
  width: 145px;
  height: 115px;
  bottom: 16px;
  left: 16px;
`;

const Title = styled.div`
  color: #FFF;
  font-family: "Pretendard Variable";
  font-size: 22px;
  font-weight: 700;
  line-height: 35px;
  text-transform: uppercase;
  margin-bottom: 30px;
`;

const SubInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;

  color: var(--foundation-red-normal-active, #D90206);
  font-family: "Pretendard Variable";
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const PuzzleIcon = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 5px;
`;

const Location = styled.div`
  display: flex;
  width: 42px;
  height: 20px;
  padding: 4px 5px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink:0;

  border-radius: 20px;
  border: 1px solid #FFF;
  background: #FFF;

  color: #000;
  font-family: "Pretendard Variable";
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const Icon = styled.div`
`;

const Branch = styled.div`
  color: #BABABA;
  font-family: "Pretendard Variable";
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
  line-height: 45px;
`;

export default InfoOverlay;
