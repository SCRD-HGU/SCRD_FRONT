import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";

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

const TierPage = () => {
  const [hoveredTier, setHoveredTier] = useState(null);

  return (
    <>
      <GlobalStyle />
      <Container>
        <SemiContainer>
          <UserTier>
            <Text>
              WHAT<br />TIE_R<br />U?
            </Text>
            <Tier>
              HOLMES (259)
            </Tier>
            <Discription>
              According To The<br />Number Of<br />Rooms Escaped
            </Discription>
          </UserTier>
          <ScrollTier>
            <Tier1
              isHovered={hoveredTier !== null && hoveredTier !== "Tier1"}
              onMouseEnter={() => setHoveredTier("Tier1")}
              onMouseLeave={() => setHoveredTier(null)}
            >
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
              <TierName>
                <span className="large">HOLMES<br /><br /><br /></span>
                <span className="medium">Number of<br />Rooms Escaped<br /><br /></span>
                <span className="small">Less Than 250</span>
              </TierName>
              <TierNumber>05</TierNumber>
            </Tier5>
          </ScrollTier>
        </SemiContainer>
      </Container>
    </>
  );
};

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

const ScrollTier = styled.div`
  display: flex;
  flex-direction: row;
  width: calc(100% - 316px);
  height: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;

  &::-webkit-scrollbar {
    height: 0;
  }
  &::-webkit-scrollbar-thumb {
    background: #444;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background: #222;
  }
`;

const UserTier = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 316px;
  height: 100%;
  flex-shrink: 0;
`;

const Text = styled.div`
  width: 206px;
  height: 264px;

  color: #FFF;
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
  border: 1px solid #FFF;

  margin-top: 18px;

  color: #FFF;
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

  color: #FFF;
  font-family: "Neue Haas Grotesk Display Pro";
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const TierName = styled.div`
  color: #FFF;
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
  color: #FFF;
  font-family: "Neue Haas Grotesk Display Pro";
  font-size: 280px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const TierContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  width: 316px;
  height: 100%;
  flex-shrink: 0;
  overflow: hidden;
  transition: background-color 0.5s ease;

  &:hover {
    background-color: #D90206;
  }

  ${props =>
    props.isHovered &&
    `
    ${TierName}, ${TierNumber} {
      color: rgba(255, 255, 255, 0.40);
    }
  `}
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
