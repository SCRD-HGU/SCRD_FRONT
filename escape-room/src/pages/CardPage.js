import Masonry from "react-masonry-css";
import styled, { createGlobalStyle }from "styled-components";
import Card from "../components/Card.js";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html, body {
    display: flex;
    justify-content: center;
    min-width: 100vw;
    min-height: 100vh;
    background-color: white;
    overflow-x: hidden;
  }
`;

const data = [
  { title: "머니머니 부동산", tag: "강남", difficulty: "🔥5" },
  { title: "산장: 사라진 목격자", tag: "전주", difficulty: "🔥5" },
  { title: "Film By Bob", tag: "강남", difficulty: "🔥5" },
  { title: "MST 엔터테인먼트", tag: "강남", difficulty: "🔥5" },
  { title: "EP1: 시간이 멈춘 마을", tag: "강남", difficulty: "🔥5" },
];

const breakpointColumns = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

const CardPage = () => {
  return (
    <>
      <GlobalStyle />
      <MasonryContainer>
        <Masonry
          breakpointCols={breakpointColumns}
          className="masonry-grid"
          columnClassName="masonry-grid_column"
        >
          {data.map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </Masonry>
      </MasonryContainer>
    </>
  );
};

export default CardPage;

const MasonryContainer = styled.div`
  .masonry-grid {
    display: flex;
    margin-left: -20px;
    width: auto;
  }

  .masonry-grid_column {
    padding-left: 20px;
    background-clip: padding-box;
  }
`;
