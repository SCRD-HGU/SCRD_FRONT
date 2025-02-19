import React, { useState } from "react";
import styled from "styled-components";
import { RiKnifeBloodLine } from "react-icons/ri";
import { PiSneakerMoveFill } from "react-icons/pi";
import { IoIosSearch } from "react-icons/io";

function OptionBar() {
  const [region, setRegion] = useState("전체");
  const [difficulty, setDifficulty] = useState("전체");
  const [isFearActive, setIsFearActive] = useState(false);
  const [isActivityActive, setIsActivityActive] = useState(false);

  const handleRegionChange = (e) => {
    setRegion(e.target.value);
  };
  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };
  const toggleFear = () => {
    setIsFearActive(!isFearActive);
  };
  const toggleActivity = () => {
    setIsActivityActive(!isActivityActive);
  };
  const handleSearch = () => {
    console.log("지역:", region);
    console.log("난이도:", difficulty);
    console.log("공포도 활성 여부:", isFearActive);
    console.log("활동성 활성 여부:", isActivityActive);
  };

  return (
    <FixedBar>
      {/* 지역 드롭다운 */}
      <Local>
        <label htmlFor="region" style={{ marginRight: 4 }}>
          지역
        </label>
        <select id="region" value={region} onChange={handleRegionChange}>
          <option value="전체">전체</option>
          <option value="서울">서울</option>
          <option value="경기">경기</option>
          <option value="부산">부산</option>
        </select>
      </Local>

      {/* 난이도 드롭다운 */}
      <Difficulty>
        <label htmlFor="difficulty" style={{ marginRight: 4 }}>
          난이도
        </label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={handleDifficultyChange}
        >
          <option value="전체">전체</option>
          <option value="쉬움">쉬움</option>
          <option value="보통">보통</option>
          <option value="어려움">어려움</option>
        </select>
      </Difficulty>

      {/* 공포도 아이콘 버튼 */}
      <Horror onClick={toggleFear} active={isFearActive}>
        <RiKnifeBloodLine />
        <span>공포도</span>
        <span style={{ marginLeft: "6px" }}>{isFearActive ? "o" : "x"}</span>
      </Horror>

      {/* 활동성 아이콘 버튼 */}
      <Move onClick={toggleActivity} active={isActivityActive}>
        <PiSneakerMoveFill />
        <span>활동성</span>
        <span style={{ marginLeft: "6px" }}>{isActivityActive ? "o" : "x"}</span>
      </Move>

      {/* 검색 버튼 */}
      <Search onClick={handleSearch}>
        <IoIosSearch />
      </Search>
    </FixedBar>
  );
}

export default OptionBar;

const FixedBar = styled.div`
  position: fixed;
  bottom: 40px; /* 화면 하단에서 40px */
  left: 50%;
  transform: translateX(-50%); /* 수평 중앙 정렬 */
  display: flex;
  width: 600px;
  height: 42px;
  border-radius: 3px;
  background: #fff;

  z-index: 999;
`;

const Local = styled.div`
  color: #000;
  font-family: "Pretendard Variable";
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-left: 38px;
  margin-top: 13px;
`;

const Difficulty = styled.div`
  color: #000;
  font-family: "Pretendard Variable";
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-left: 20px;
  margin-top: 13px;
`;

const Horror = styled.div`
  color: ${(props) =>
    props.active
      ? "var(--foundation-red-normal-active, #D90206)"
      : "#000"};
  font-family: "Pretendard Variable";
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-left: 20px;
  margin-top: 3px;
  display: flex;
  align-items: center;
  cursor: pointer;

  svg {
    margin-right: 6px; /* 아이콘과 텍스트 사이 6px 간격 */
  }
`;

const Move = styled.div`
  color: ${(props) =>
    props.active
      ? "var(--foundation-red-normal-active, #D90206)"
      : "#000"};
  font-family: "Pretendard Variable";
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-left: 20px;
  margin-top: 3px;
  display: flex;
  align-items: center;
  cursor: pointer;

  svg {
    margin-right: 6px; /* 아이콘과 텍스트 사이 6px 간격 */
  }
`;

const Search = styled.div`
  width: 20px;
  height: 20px;
  margin-left: 180px;
  margin-top: 13px;
  cursor: pointer;
`;
