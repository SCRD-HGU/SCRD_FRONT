import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes, createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    min-height: 100vh;
    background-color: #D90206;
    overflow: hidden;
    overscroll-behavior: none;
}
`;

const moveLeft = keyframes`0% { transform: rotate(-9.775deg) translateX(0); } 100% { transform: rotate(-9.775deg) translateX(-400px); }`;
const moveRight = keyframes`0% { transform: rotate(-9.775deg) translateX(0); } 100% { transform: rotate(-9.775deg) translateX(400px); }`;
const moveLeftForText2 = keyframes`0% { transform: rotate(9.77deg) translateX(0); } 100% { transform: rotate(9.77deg) translateX(-400px); }`;
const moveRightForText2 = keyframes`0% { transform: rotate(9.77deg) translateX(0); } 100% { transform: rotate(9.77deg) translateX(400px); }`;
const moveLeftForText3 = keyframes`0% { transform: rotate(6.8deg) translateX(0); } 100% { transform: rotate(6.8deg) translateX(-400px); }`;
const moveRightForText3 = keyframes`0% { transform: rotate(6.8deg) translateX(0); } 100% { transform: rotate(6.8deg) translateX(400px); }`;

const Loading = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setLoading(false);
        navigate("/login");
      }, 1000);
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  if (!loading) return null;

  return (
    <>
      <GlobalStyle />
      <FullscreenOverlay fadeOut={fadeOut} />
      <Wrapper fadeOut={fadeOut}>
        <ContentBox>
          <FirstText>FOLLOW</FirstText>
          <SecondText>SCARLET</SecondText>
          <ThirdText>THREADS</ThirdText>
          <FirstBox>
            <InnerBox>
              <FirstText2>FOLLOW</FirstText2>
              <SecondText2>SCARLET</SecondText2>
              <ThirdText2>THREADS</ThirdText2>
            </InnerBox>
          </FirstBox>
          <SecondBox>
            <LastBox>
              <FirstText3>FOLLOW</FirstText3>
              <SecondText3>SCARLET</SecondText3>
              <ThirdText3>THREADS</ThirdText3>
            </LastBox>
          </SecondBox>
          <MatchingText1>{"ESCAPE ROOM\nTEAM MATCHING"}</MatchingText1>
          <MatchingText2>{"ESCAPE ROOM\nTEAM MATCHING"}</MatchingText2>
          <MatchingText3>{"ESCAPE ROOM\nTEAM MATCHING"}</MatchingText3>
        </ContentBox>
      </Wrapper>
    </>
  );
};

export default Loading;

const FullscreenOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${(props) => (props.fadeOut ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 0)")};
  backdrop-filter: ${(props) => (props.fadeOut ? "blur(10px)" : "none")};
  transition: background 1s ease-out, backdrop-filter 1s ease-out;
  pointer-events: none;
  z-index: 100;
`;

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: #D90206;
  transition: opacity 1s ease-out;
  opacity: ${(props) => (props.fadeOut ? 0 : 1)};
  padding-top: 40px;
`;

const ContentBox = styled.div`
  width: 100%;
  max-width: 1037px;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transform: scale(${window.innerWidth / 1440});
  transform-origin: top center;
`;

const TextStyle = `
  color: #000;
  font-family: "Neue Haas Grotesk Display Pro";
  font-size: 230px;
  font-style: normal;
  font-weight: 500;
  text-transform: uppercase;
`;

const FirstText = styled.div`
  ${TextStyle}
  transform: rotate(-9.775deg) translate(175px, 0);
  animation: ${moveLeft} 2s ease-out forwards;
`;
const SecondText = styled.div`
  ${TextStyle}
  transform: rotate(-9.775deg) translate(-300px, 20px);
  animation: ${moveRight} 2s ease-out forwards;
`;
const ThirdText = styled.div`
  ${TextStyle}
  transform: rotate(-9.775deg) translate(250px, 40px);
  animation: ${moveLeft} 2s ease-out forwards;
`;

const FirstBox = styled.div`
  position: absolute;
  top: 48%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 425.06px;
  height: 539.34px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
`;

const InnerBox = styled.div`
  width: 352.25px;
  height: 489.95px;
  transform: rotate(9.77deg);
  background-color: #d90206;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.3), inset 0 0 40px rgba(0, 0, 0, 0.2), inset 0 0 60px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TextStyle2 = `
  color: #000;
  font-family: "Neue Haas Grotesk Display Pro", sans-serif;
  font-size: 180px;
  font-style: normal;
  font-weight: 500;
  text-transform: uppercase;
  text-align: center;
`;

const FirstText2 = styled.div`
  ${TextStyle2}
  margin-bottom: 5px;
  transform: translate(130px, 0);
  animation: ${moveLeftForText2} 2s ease-out forwards;
`;
const SecondText2 = styled.div`
  ${TextStyle2}
  margin-bottom: 5px;
  transform: translate(-265px, 0);
  animation: ${moveRightForText2} 2s ease-out forwards;
`;
const ThirdText2 = styled.div`
  ${TextStyle2}
  transform: translate(275px, 0);
  animation: ${moveLeftForText2} 2s ease-out forwards;
`;

const SecondBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 226.64px;
  height: 293.56px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LastBox = styled.div`
  width: 195.8px;
  height: 272.3px;
  transform: rotate(-6.8deg);
  background-color: #d90206;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.3), inset 0 0 40px rgba(0, 0, 0, 0.2), inset 0 0 60px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const TextStyle3 = `
  color: #000;
  font-family: "Neue Haas Grotesk Display Pro", sans-serif;
  font-size: 150px;
  font-style: normal;
  font-weight: 500;
  text-transform: uppercase;
  text-align: center;
  line-height: 0.8;
`;

const FirstText3 = styled.div`
  ${TextStyle3}
  transform: rotate(6.8deg) translateX(120px);
  animation: ${moveLeftForText3} 2s ease-out forwards;
`;
const SecondText3 = styled.div`
  ${TextStyle3}
  transform: rotate(6.8deg) translateX(-220px);
  animation: ${moveRightForText3} 2s ease-out forwards;
`;
const ThirdText3 = styled.div`
  ${TextStyle3}
  transform: rotate(6.8deg) translateX(200px);
  animation: ${moveLeftForText3} 2s ease-out forwards;
`;

const MatchingText = styled.div`
  position: absolute;
  color: #fff;
  font-family: "Neue Haas Grotesk Display Pro", sans-serif;
  font-size: 22px;
  font-weight: 500;
  line-height: normal;
  text-transform: uppercase;
  transform: rotate(-9.775deg);
  white-space: pre-line;
`;

const MatchingText1 = styled(MatchingText)`
  top: 5vh;
  left: 25vw;
  z-index: 10;
`;
const MatchingText2 = styled(MatchingText)`
  top: 35vh;
  right: 25vw;
  z-index: 10;
`;
const MatchingText3 = styled(MatchingText)`
  bottom: 3vh;
  left: 20vw;
  z-index: 10;
`;
