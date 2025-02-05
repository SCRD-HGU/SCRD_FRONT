import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Puzzle from "../assets/puzzle.svg";
import dongsan from "../assets/Theme.png";

const Card = ({ item }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldHide, setShouldHide] = useState(true);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setShouldHide(true);
        } else {
          setIsVisible(false);
          setTimeout(() => {
            setShouldHide(false);
          }, 500);
        }
      },
      {
        root:null,
        threshold: 0.1,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  return (
    <CardWrapper ref={cardRef} isVisible={isVisible} shouldHide={shouldHide}>
      <Thumbnail />
      <Info>
        <Title>{item.title}</Title>
        <SubInfo>
          <Rating>
            <PuzzleIcon src={Puzzle} alt="Rating Icon" />
            {item.difficulty}
          </Rating>
          <Location>{item.tag}</Location>
        </SubInfo>
        <Branch>{item.branch}</Branch>
      </Info>
    </CardWrapper>
  );
};

export default Card;

const CardWrapper = styled.div`
  position: relative;
  width: 253px;
  height: auto;
  display: flex;
  flex-direction: column;

  background: transparent;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  margin-bottom: 56px;

  transition: opacity 0.8s ease-out, transform 0.8s ease-out;

  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  trnsform: ${({ isVisible }) => (isVisible ? "translateY(0px)" : "translateY(30px)")};

  ${({ shouldHide }) => !shouldHide && `
    opacity: 0;
    transform: translateY(40px);
    `}
`;

const Thumbnail = styled.div`
  width: 253px;
  height: 253px;
  flex-shrink: 0;
  margin-bottom: 30px;

  background-image: url(${dongsan});
  background-size: 100%;
  background-position: center top;
  background-repeat: no-repeat;
`;

const Info = styled.div`
  padding: 3px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: transparent;

  flex-grow: 1;

  margin-bottom: 45px;
`;

const Title = styled.div`
  color: #FFF;
  font-family: "Pretendard Variable";
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: 35px;
  text-transform: uppercase;

  margin-bottom: 25px;
`;

const SubInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;

  margin-bottom: 10px;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  color: #D90206;
  font-family: "Pretendard Variable";
  font-size: 16px;
  font-weight: 600;
`;

const PuzzleIcon = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 5px;
`;

const Location = styled.div`
  color: #000;
  font-family: "Pretendard Variable";
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  display: flex;
  width: 42px;
  height: 20px;
  padding: 4px 5px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  border-radius: 20px;
  border: 1px solid #FFF;
  background: #FFF;
`;

const Branch = styled.div`
  font-family: "Pretendard Variable";
  font-size: 13px;
  font-weight: 700;
  font-style: normal;
  color: #BABABA;
  margin-top: 5px;
`;
