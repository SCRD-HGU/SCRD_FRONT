// OptionBar.tsx (또는 .js)

import React, { useState } from "react";
import styled from "styled-components";
import { RiKnifeBloodLine } from "react-icons/ri";
import { PiSneakerMoveFill } from "react-icons/pi";

function OptionBar() {
  const [region, setRegion] = useState("전체");
  const [difficulty, setDifficulty] = useState("전체");
  const [isFearActive, setIsFearActive] = useState(false);
  const [isActivityActive, setIsActivityActive] = useState(false);

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRegion(e.target.value);
  };
  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
      <div>
        <label htmlFor="region" style={{ marginRight: 4 }}>
          지역
        </label>
        <select id="region" value={region} onChange={handleRegionChange}>
          <option value="전체">전체</option>
          <option value="서울">서울</option>
          <option value="경기">경기</option>
          <option value="부산">부산</option>
        </select>
      </div>

      {/* 난이도 드롭다운 */}
      <div>
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
      </div>

      {/* 공포도 아이콘 버튼 */}
      <button
        type="button"
        onClick={toggleFear}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          background: "none",
          border: "1px solid #ccc",
          borderRadius: 4,
          padding: "4px 8px",
          cursor: "pointer",
          color: isFearActive ? "red" : "black",
        }}
      >
        <RiKnifeBloodLine />
        공포도
      </button>

      {/* 활동성 아이콘 버튼 */}
      <button
        type="button"
        onClick={toggleActivity}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          background: "none",
          border: "1px solid #ccc",
          borderRadius: 4,
          padding: "4px 8px",
          cursor: "pointer",
          color: isActivityActive ? "blue" : "black",
        }}
      >
        <PiSneakerMoveFill />
        활동성
      </button>

      {/* 검색 버튼 */}
      <button
        type="button"
        onClick={handleSearch}
        style={{
          marginLeft: "auto",
          padding: "8px 16px",
          borderRadius: 4,
          border: "1px solid #333",
          backgroundColor: "#fff",
          cursor: "pointer",
        }}
      >
        검색
      </button>
    </FixedBar>
  );
}

export default OptionBar;

// 아래는 styled-components 예시
const FixedBar = styled.div`
  position: fixed;
  bottom: 40px; /* 화면 하단에서 40px */
  left: 50%;
  transform: translateX(-50%); /* 수평 중앙 정렬 */
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  border: 1px solid #ccc;
  background-color: #fff; /* 필요하면 배경색 지정 */
  z-index: 999; /* 다른 요소 위로 올리려면 z-index 필요 */
`;
