import React, { useRef, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import MoveLeft from "../assets/MoveLeft.svg";
import MoveRight from "../assets/MoveRight.svg";

const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html, body {
    overflow-x: hidden;
    width: 100%;
  }
`;

// SVG 라인 컴포넌트
const LineSVG = ({ isFlipped }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="319"
    height="589"
    viewBox="0 0 319 589"
    fill="none"
    style={{
      transform: isFlipped ? "scaleX(-1)" : "none",
      position: "absolute",
      top: "150",
      left: 0,
    }}
  >
    <path
      d="M1.5 581C10.3333 589.333 33.7 596.1 56.5 556.5C85 507 61.5 376 108.5 326.5C155.5 277 247 280 260.5 191.5C274 103 277 27.5 317.5 1.5"
      stroke="black"
      strokeWidth="2"
    />
  </svg>
);

const TierPage = () => {
  const [hoveredTier, setHoveredTier] = useState(null);
  const scrollContainerRef = useRef(null);

  // 화살표 버튼 클릭 시 스크롤 이동
  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 316; // Tier 하나의 너비
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <SemiContainer>
          <UserTier>
            <Text>
              WHAT<br />TIE_R<br />U?
            </Text>
            <Tier>HOLMES (259)</Tier>
            <Discription>
              According To The<br />Number Of<br />Rooms Escaped
            </Discription>
          </UserTier>
          <ScrollWrapper>
            <MoveButton
              src={MoveLeft}
              alt="Move Left"
              onClick={() => handleScroll("left")}
              position="left"
            />
            <ScrollTier ref={scrollContainerRef}>
              <Tier1
                isHovered={hoveredTier !== null && hoveredTier !== "Tier1"}
                onMouseEnter={() => setHoveredTier("Tier1")}
                onMouseLeave={() => setHoveredTier(null)}
              >
                <SVGWrapper>
                  <LineSVG isFlipped={false} />
                </SVGWrapper>
                <TierName>
                  <span className="large">NEEDLE<br /><br /><br /></span>
                  <span className="medium">Number of<br />Rooms Escaped<br /><br /></span>
                  <span className="small">Less Than 50</span>
                </TierName>
                <TierNumber>01</TierNumber>
              </Tier1>
              <Tier2
                isHovered={hoveredTier !== null && hoveredTier !== "Tier2"}
                onMouseEnter={() => setHoveredTier("Tier2")}
                onMouseLeave={() => setHoveredTier(null)}
              >
                <SVGWrapper isEven={true}>
                  <LineSVG isFlipped={true} />
                </SVGWrapper>
                <TierNumber>02</TierNumber>
                <TierName>
                  <span className="large">CLIP<br /><br /><br /></span>
                  <span className="medium">Number of<br />Rooms Escaped<br /><br /></span>
                  <span className="small">Less Than 100</span>
                </TierName>
              </Tier2>
              <Tier3
                isHovered={hoveredTier !== null && hoveredTier !== "Tier3"}
                onMouseEnter={() => setHoveredTier("Tier3")}
                onMouseLeave={() => setHoveredTier(null)}
              >
                <SVGWrapper>
                  <LineSVG isFlipped={false} />
                </SVGWrapper>
                <TierName>
                  <span className="large">KEY<br /><br /><br /></span>
                  <span className="medium">Number of<br />Rooms Escaped<br /><br /></span>
                  <span className="small">Less Than 150</span>
                </TierName>
                <TierNumber>03</TierNumber>
              </Tier3>
              <Tier4
                isHovered={hoveredTier !== null && hoveredTier !== "Tier4"}
                onMouseEnter={() => setHoveredTier("Tier4")}
                onMouseLeave={() => setHoveredTier(null)}
              >
                <SVGWrapper isEven={true}>
                  <LineSVG isFlipped={true} />
                </SVGWrapper>
                <TierNumber>04</TierNumber>
                <TierName>
                  <span className="large">IRIS<br /><br /><br /></span>
                  <span className="medium">Number of<br />Rooms Escaped<br /><br /></span>
                  <span className="small">Less Than 200</span>
                </TierName>
              </Tier4>
              <Tier5
                isHovered={hoveredTier !== null && hoveredTier !== "Tier5"}
                onMouseEnter={() => setHoveredTier("Tier5")}
                onMouseLeave={() => setHoveredTier(null)}
              >
                <SVGWrapper>
                  <LineSVG isFlipped={false} />
                </SVGWrapper>
                <TierName>
                  <span className="large">HOLMES<br /><br /><br /></span>
                  <span className="medium">Number of<br />Rooms Escaped<br /><br /></span>
                  <span className="small">Less Than 250</span>
                </TierName>
                <TierNumber>05</TierNumber>
              </Tier5>
            </ScrollTier>
            <MoveButton
              src={MoveRight}
              alt="Move Right"
              onClick={() => handleScroll("right")}
              position="right"
            />
          </ScrollWrapper>
        </SemiContainer>
      </Container>
    </>
  );
};

// Styled Components
const Container = styled.div`
  transform: scale(var(--scale));
  transform-origin: top left;
  width: 1440px;
  height: 900px;
  background: #000;
  display: flex;
  justify-content: center;
`;

const SemiContainer = styled.div`
  width: 1037px;
  height: 100%;
  background: #000;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const ScrollWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: calc(100% - 316px);
  height: 100%;
`;

const ScrollTier = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  overflow-x: auto;
  white-space: nowrap;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const MoveButton = styled.img`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ position }) => (position === "left" ? "left: -50px;" : "right: -50px;")}
  width: 50px;
  height: 50px;
  cursor: pointer;
`;

const UserTier = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 316px;
  height: 100%;
`;

const Text = styled.div`
  width: 206px;
  height: 264px;
  color: #fff;
  font-family: "Neue Haas Grotesk Display Pro";
  font-size: 74px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const Tier = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 190px;
  height: 43px;
  border-radius: 50px;
  border: 1px solid #fff;
  margin-top: 18px;
  color: #fff;
  font-family: "Neue Haas Grotesk Text Pro";
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Discription = styled.div`
  width: 153px;
  height: 72px;
  margin-right: 50px;
  margin-top: 367px;
  color: #fff;
  font-family: "Neue Haas Grotesk Display Pro";
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const TierName = styled.div`
  color: #fff;
  font-family: "Neue Haas Grotesk Display Pro";
  font-weight: 500;
  font-style: normal;
  line-height: normal;

  .large {
    font-size: 40px;
  }

  .medium {
    font-size: 20px;
  }

  .small {
    font-size: 27px;
  }
`;

const TierNumber = styled.div`
  color: #fff;
  font-family: "Neue Haas Grotesk Display Pro";
  font-size: 280px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  z-index: 2;
`;

const TierContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  width: 316px;
  height: 100%;
  flex-shrink: 0;
  overflow: hidden;
  transition: background-color 0.5s ease;
  position: relative;

  &:hover {
    background-color: #D90206;
  }

  ${({ isHovered }) =>
    isHovered &&
    `
    ${TierName}, ${TierNumber} {
      color: rgba(255, 255, 255, 0.40);
    }
  `}
`;

const SVGWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: ${({ isEven }) => (isEven ? 0 : 3)};
`;

const Tier1 = styled(TierContainer)`
  position: relative;

  ${TierName} {
    margin-left: 54px;
    margin-top: 67px;
  }

  ${TierNumber} {
    margin-top: auto;
    margin-left: -47px;
  }
`;

const Tier2 = styled(TierContainer)`
  ${TierName} {
    margin-left: 54px;
    margin-bottom: 74px;
  }

  ${TierNumber} {
    margin-bottom: auto;
    margin-left: -47px;
  }
`;

const Tier3 = styled(TierContainer)`
  ${TierName} {
    margin-left: 54px;
    margin-top: 67px;
  }

  ${TierNumber} {
    margin-top: auto;
    margin-left: -47px;
  }
`;

const Tier4 = styled(TierContainer)`
  ${TierName} {
    margin-left: 54px;
    margin-bottom: 74px;
  }

  ${TierNumber} {
    margin-bottom: auto;
    margin-left: -47px;
  }
`;

const Tier5 = styled(TierContainer)`
  ${TierName} {
    margin-left: 54px;
    margin-top: 67px;
  }

  ${TierNumber} {
    margin-top: auto;
    margin-left: -47px;
  }
`;

export default TierPage;
