// src/components/OptionBar.js
import React, { useState } from "react";
import styled from "styled-components";
import { RiKnifeBloodLine } from "react-icons/ri";
import { PiSneakerMoveFill } from "react-icons/pi";
import { IoIosSearch } from "react-icons/io";
import { useFetchFilteredThemes } from "../hooks/useFetchFilteredThemes";

function OptionBar() {
  // ✅ 필터 상태
  const [levelMin, setLevelMin] = useState(1);
  const [levelMax, setLevelMax] = useState(5);
  const [isFearActive, setIsFearActive] = useState(false);
  const [isActivityActive, setIsActivityActive] = useState(false);

  const [searchTerm, setSearchTerm] = useState(""); // 입력 중인 검색어
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState(""); // 실제 검색용 검색어

  // ✅ 검색 트리거 핸들러
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSubmittedSearchTerm(searchTerm);
    }
  };

  const handleSearchClick = () => {
    setSubmittedSearchTerm(searchTerm);
  };

  // ✅ React Query로 필터된 데이터 가져오기
  const { data: filteredItems = [], isLoading, isError } = useFetchFilteredThemes({
    levelMin,
    levelMax,
    isFearActive,
    isActivityActive,
    searchTerm: submittedSearchTerm,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: Failed to load data.</p>;

  return (
    <FixedBar>
      <Difficulty>
        <Select value={levelMin} onChange={(e) => setLevelMin(Number(e.target.value))}>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </Select>

        <Tilde>~</Tilde>

        <Select value={levelMax} onChange={(e) => setLevelMax(Number(e.target.value))}>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </Select>
      </Difficulty>

      <Horror onClick={() => setIsFearActive(!isFearActive)} active={isFearActive}>
        <RiKnifeBloodLine /> 공포도
      </Horror>

      <Move onClick={() => setIsActivityActive(!isActivityActive)} active={isActivityActive}>
        <PiSneakerMoveFill /> 활동성
      </Move>

      <SearchInput
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="검색어 입력"
      />

      <Search onClick={handleSearchClick}>
        <IoIosSearch />
      </Search>
    </FixedBar>
  );
}

export default OptionBar;

// ✅ Styled-components
const FixedBar = styled.div`
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  width: 600px;
  height: 42px;
  border-radius: 3px;
  background: #fff;
  z-index: 999;
`;

const Difficulty = styled.div`
  margin-left: 20px;
  margin-top: 14px;
  font-family: "Pretendard Variable";
  font-size: 13px;
  font-weight: 600;
`;

const Select = styled.select`
  border: none;
  background: none;
  outline: none;
  font-family: "Pretendard Variable";
  font-size: 13px;
  font-weight: 600;
  color: #000;
  margin-right: 4px;
  padding-right: 16px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 5L5 1L9 5' stroke='%23000' stroke-width='2'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right center;
`;

const Tilde = styled.span`
  margin: 0 8px;
  font-size: 13px;
  font-weight: 600;
  color: #000;
`;

const Horror = styled.div`
  color: ${(props) => (props.active ? "#D90206" : "#000")};
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
  color: ${(props) => (props.active ? "#D90206" : "#000")};
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