import React from "react";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html, body {
    overflow-x: hidden;
    width: 100%
  }
`;

const TierPage = () => {
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
          <Tier1>
            <TierName>
              <span className = "large">NEEDLE<br /><br /><br /></span>
              <span className = "medium">Number of<br />Rooms Escaped<br /><br /></span>
              <span className = "small">Less Than 50</span>
            </TierName>
            <TierNumber>
              01
            </TierNumber>
          </Tier1>
          <Tier2>
            <TierNumber>
              02
            </TierNumber>
            <TierName>
              <span className = "large">CLIP<br /><br /><br /></span>
              <span className = "medium">Number of<br />Rooms Escaped<br /><br /></span>
              <span className = "small">Less Than 100</span>
            </TierName>
          </Tier2>
          <Tier3>
            <TierName>
              <span className = "large">KEY<br /><br /><br /></span>
              <span className = "medium">Number of<br />Rooms Escaped<br /><br /></span>
              <span className = "small">Less Than 150</span>
            </TierName>
            <TierNumber>
              03
            </TierNumber>
          </Tier3>
        </SemiContainer>
      </Container>
    </>
  );
};

const Container = styled.div`
  transform: scale(var(--scale)); /* scale 속성 적용 */
  transform-origin: top left; /* 확대/축소 기준 */
  width: 1440px; /* 기준 너비 */
  height: 900px; /* 기준 높이 */
  background: #000; /* 전체 배경색 */
  display: flex;
  justify-content: center;
`;

const SemiContainer = styled.div`
  width: 1037px;
  height: 100%;
  background: #000;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const UserTier = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 316px;
  height: 100%;
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

const Tier1 = styled.div`
  display: flex;
  flex-direction: column;
  width: 316px;
  height: 100%;
  overflow: hidden;

  ${TierName} {
    margin-left: 54px;
    margin-top: 67px;
  }

  ${TierNumber} {
    margin-top: auto;
    margin-left: -47px;
  }
`;

const Tier2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 316px;
  height: 100%;
  overflow: hidden;

  ${TierName} {
    margin-left: 54px;
    margin-bottom: 74px;
  }

  ${TierNumber} {
    margin-bottom: auto;
    margin-left: -47px;
  }
`;

const Tier3 = styled.div`
  display: flex;
  flex-direction: column;
  width: 316px;
  height: 100%;
  overflow: hidden;

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