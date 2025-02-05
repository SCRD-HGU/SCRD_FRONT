import React, { useState } from "react";
import styled from "styled-components";
import { FaChevronUp, FaChevronDown, FaSearch } from "react-icons/fa";
import Puzzle from "../assets/puzzle.svg"; // 사용자가 제공한 이미지
import knife from "../assets/knife.svg";
import shoes from "../assets/shoes.svg";

const FilterBar = () => {
  // ✅ 지역과 난이도 선택 상태
  const [regionActive, setRegionActive] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("강남");

  const [difficultyActive, setDifficultyActive] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  // ✅ 공포도와 활동성 X/O 상태
  const [fearLevel, setFearLevel] = useState("X");
  const [activityLevel, setActivityLevel] = useState("X");

  return (
    <FilterContainer>
      <Items>
        <Select>
          {/* 지역 선택 */}
          <Location onClick={() => setRegionActive(!regionActive)}>
            지역 {regionActive ? <FaChevronDown /> : <FaChevronUp />}
          </Location>
          {regionActive && (
            <Dropdown>
              <DropdownItem onClick={() => setSelectedRegion("강남")}>강남</DropdownItem>
            </Dropdown>
          )}

          {/* 난이도 선택 */}
          <Step onClick={() => setDifficultyActive(!difficultyActive)}>
            {selectedDifficulty && <PuzzleIcon src={Puzzle} alt="Puzzle" />}
            난이도 {difficultyActive ? <FaChevronDown /> : <FaChevronUp />}
          </Step>
          {difficultyActive && (
            <Dropdown>
              {[1, 2, 3, 4, 5].map((num) => (
                <DropdownItem key={num} onClick={() => setSelectedDifficulty(num)}>
                  {num}
                </DropdownItem>
              ))}
            </Dropdown>
          )}

          {/* 공포도 선택 */}
          <Horror onClick={() => setFearLevel(fearLevel === "X" ? "O" : "X")}>
            공포도 {fearLevel}
          </Horror>

          {/* 활동성 선택 */}
          <Move onClick={() => setActivityLevel(activityLevel === "X" ? "O" : "X")}>
            활동성 {activityLevel}
          </Move>
        </Select>

        {/* 검색 버튼 */}
        <Search>
          <FaSearch />
        </Search>
      </Items>
    </FilterContainer>
  );
};

export default FilterBar;

// ✅ 스타일 정의
const FilterContainer = styled.div`
  width: 700px;
  height: 55px;
  border-radius: 3px;
  background: #fff;
  display: flex;
  align-items: center;
  padding: 10px;
  position: relative;
`;

const Items = styled.div`
  display: flex;
  gap: 232px;
  padding: 0 20px;

  align-items: center;
`;

const Select = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const Location = styled.div`
  display: flex;
  width: 67px;
  height: 28px;
  padding: 4px 5px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;

  color: #000;
  font-family: "Pretendard Variable";
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  cursor: pointer;
`;

const Step = styled.div`
  display: flex;
  width: 79px;
  height: 28px;
  padding: 4px 5px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;

  color: #000;
  font-family: "Pretendard Variable";
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  cursor: pointer;
`;

const Horror = styled.div`
  display: inline-flex;
  height: 28px;
  padding: 5px 7px 5px 10px;
  justify-content: center;
  align-items: flex-start;
  gap: 3px;
  flex-shrink: 0;

  color: #000;
  font-family: "Pretendard Variable";
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  cursor: pointer;
`;

const Move = styled.div`
  display: inline-flex;
  height: 28px;
  padding: 5px 7px 5px 10px;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;
  flex-shrink: 0;

  color: #000;
  font-family: "Pretendard Variable";
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  cursor: pointer;
`;

const Search = styled.div`
  width: 24px;
  height: 24px;
`;

const Dropdown = styled.div`
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  padding: 5px;
  bottom: 40px;
  z-index: 10;
`;

const DropdownItem = styled.div`
  padding: 5px;
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
  }
`;

const PuzzleIcon = styled.img`
  width: 15px;
  height: 15px;
  margin-right: 5px;
`;

