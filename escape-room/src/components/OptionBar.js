// src/components/OptionBar.js
import React, { useState } from "react";
import styled from "styled-components";
import { RiKnifeBloodLine } from "react-icons/ri";
import { PiSneakerMoveFill } from "react-icons/pi";
import { IoIosSearch } from "react-icons/io";
import { useFetchFilteredThemes } from "../hooks/useFetchFilteredThemes";

function OptionBar({ setSearchedItems }) {
  // ✅ 필터 상태
  const [region, setRegion] = useState("");
  const [levelMin, setLevelMin] = useState(1);
  const [levelMax, setLevelMax] = useState(5);
  const [isFearActive, setIsFearActive] = useState(false);
  const [isActivityActive, setIsActivityActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ React Query로 필터된 데이터 가져오기
  const { data: filteredItems = [], isLoading, isError } = useFetchFilteredThemes({
    region,
    levelMin,
    levelMax,
    isFearActive,
    isActivityActive,
    searchTerm,
  });

  // ✅ React Query의 상태를 직접 사용 (setSearchedItems 제거)
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: Failed to load data.</p>;

  // ✅ React Query에서 불러온 데이터 바로 사용
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
        placeholder="검색어 입력"
      />

      <Search>
        <IoIosSearch />
      </Search>
    </FixedBar>
  );
}

export default OptionBar;

// ✅ Styled-components 그대로 유지
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
  font-size: 13px;
  font-weight: 600;
`;

const Select = styled.select`
  border: none;
  background: none;
  font-size: 13px;
  font-weight: 600;
  padding-right: 16px;
`;

const Tilde = styled.span`
  margin: 0 8px;
  font-size: 13px;
  font-weight: 600;
`;

const Horror = styled.div`
  color: ${(props) => (props.active ? "#D90206" : "#000")};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const Move = styled.div`
  color: ${(props) => (props.active ? "#D90206" : "#000")};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 200px;
  background: none;
  border: none;
  font-size: 13px;
  padding: 2px 4px;
  outline: none;
`;

const Search = styled.div`
  width: 20px;
  height: 20px;
  margin-top: 13px;
  margin-right: 15px;
  cursor: pointer;
`;