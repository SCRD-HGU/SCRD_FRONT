import React, { useState } from "react";
import styled from "styled-components";
import { RiKnifeBloodLine } from "react-icons/ri";
import { PiSneakerMoveFill } from "react-icons/pi";
import { IoIosSearch } from "react-icons/io";

function OptionBar() {
  const [region, setRegion] = useState("지역");
  const [difficulty, setDifficulty] = useState("난이도");
  const [isFearActive, setIsFearActive] = useState(false);
  const [isActivityActive, setIsActivityActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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
        <Select id="region" value={region} onChange={handleRegionChange}>
          <option value="지역" disabled hidden>
            지역
          </option>
          <option value="전체">전체</option>
          <option value="서울">서울</option>
          <option value="경기">경기</option>
          <option value="부산">부산</option>
        </Select>
      </Local>

      {/* 난이도 드롭다운 */}
      <Difficulty>
        <Select id="difficulty" value={difficulty} onChange={handleDifficultyChange}>
          <option value="난이도" disabled hidden>
            난이도
          </option>
          <option value="전체">전체</option>
          <option value="쉬움">쉬움</option>
          <option value="보통">보통</option>
          <option value="어려움">어려움</option>
        </Select>
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
      <SearchInput
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="검색어 입력"
      />
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
  font-family: "Pretendard Variable";
  font-size: 13px;
  font-weight: 600;
  margin-left: 38px;
  margin-top: 14px;
`;

const Difficulty = styled.div`
  font-family: "Pretendard Variable";
  font-size: 13px;
  font-weight: 600;
  margin-left: 20px;
  margin-top: 14px;
`;

const Select = styled.select`
  border: none;
  background: none;
  outline: none;
  font-family: "Pretendard Variable";
  font-size: 13px;
  font-weight: 600;
  color: #000;
  
  /* 기본 드롭다운 화살표 제거 */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding-right: 20px; /* 화살표 공간 확보 */
  background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 5L5 1L9 5' stroke='%23000' stroke-width='2'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right center;
`;

const Horror = styled.div`
  color: ${(props) =>
    props.active
      ? "var(--foundation-red-normal-active, #D90206)"
      : "#000"};
  font-family: "Pretendard Variable";
  font-size: 13px;
  font-weight: 600;
  margin-left: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;

  svg {
    margin-right: 6px;
  }
`;

const Move = styled.div`
  color: ${(props) =>
    props.active
      ? "var(--foundation-red-normal-active, #D90206)"
      : "#000"};
  font-family: "Pretendard Variable";
  font-size: 13px;
  font-weight: 600;
  margin-left: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;

  svg {
    margin-right: 6px;
  }
`;

const SearchInput = styled.input`
  width: 200px;
  background: none;
  border: none;
  font-family: "Pretendard Variable";
  font-size: 13px;
  font-weight: 500;
  outline: none;
  margin-left: auto;
  padding: 2px 4px;
  color: #000;

  &::placeholder {
    color: #aaa;
  }
`;

const Search = styled.div`
  width: 20px;
  height: 20px;
  margin-top: 13px;
  margin-right: 15px;
  cursor: pointer;
`;
