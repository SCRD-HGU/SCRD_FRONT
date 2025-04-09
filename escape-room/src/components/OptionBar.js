import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { RiKnifeBloodLine } from "react-icons/ri";
import { PiSneakerMoveFill } from "react-icons/pi";
import { IoIosSearch } from "react-icons/io";
import useAxiosInstance from "../api/axiosInstance";
import _debounce from "lodash/debounce";

function OptionBar({ allThemes = [], setSearchedItems }) {
  const axiosInstance = useAxiosInstance();

  // ✅ 상태 변수들
  const [region, setRegion] = useState(""); // ""은 placeholder "지역" 의미
  const [levelMin, setLevelMin] = useState(1);
  const [levelMax, setLevelMax] = useState(5);
  const [isFearActive, setIsFearActive] = useState(false);
  const [isActivityActive, setIsActivityActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ 지역 필터용 유니크 리스트 생성
  const uniqueLocations = useMemo(() => {
    const locations = allThemes.map((t) => t.location).filter(Boolean);
    return ["지역", ...new Set(locations)];
  }, [allThemes]);

  // ✅ 기본 필터 상태인지 확인하는 함수
  const isDefaultFilter = () => {
    return (
      region === "" &&
      levelMin === 1 &&
      levelMax === 5 &&
      !isFearActive &&
      !isActivityActive
    );
  };

  // ✅ 필터 값 변경 시 자동 검색 (검색어가 없고, 기본 필터 상태가 아닐 때만)
  useEffect(() => {
    if (searchTerm.trim() !== "") return;
  
    const applyFilter = _debounce(() => {
      if (isDefaultFilter()) {
        // ✅ 기본 상태일 때: /api/theme?sort=rating
        axiosInstance
          .get("/api/theme?sort=rating")
          .then((res) => setSearchedItems(res.data))
          .catch((err) => {
            console.error("❌ 기본 테마 요청 실패:", err);
            setSearchedItems([]);
          });
      } else {
        // ✅ 필터 조건 있을 때: /api/theme/filter
        const params = {};
        if (region !== "") params.location = region;
        params.levelMin = levelMin;
        params.levelMax = levelMax;
        if (isFearActive) params.horror = 1;
        if (isActivityActive) params.activity = 1;
  
        const query = new URLSearchParams(params).toString();
  
        axiosInstance
          .get(`/api/theme/filter?${query}`)
          .then((res) => setSearchedItems(res.data))
          .catch((err) => {
            console.error("❌ 필터 요청 실패:", err);
            setSearchedItems([]);
          });
      }
    }, 300);
  
    applyFilter();
    return () => applyFilter.cancel();
  }, [region, levelMin, levelMax, isFearActive, isActivityActive]);

  // ✅ 검색어 기반 검색
  const handleFilterSearch = async () => {
    if (searchTerm.trim() === "") return;

    try {
      const res = await axiosInstance.get(
        `/scrd/api/theme/search?keyword=${searchTerm.trim()}`
      );
      setSearchedItems(res.data);
    } catch (err) {
      console.error("❌ 검색 실패:", err);
      setSearchedItems([]);
    }
  };

  return (
    <FixedBar>
      {/* 지역 필터 */}
      <Local>
        <Select value={region} onChange={(e) => setRegion(e.target.value)}>
          <option value="" disabled hidden>
            지역
          </option>
          {uniqueLocations.slice(1).map((loc, i) => (
            <option key={i} value={loc}>
              {loc}
            </option>
          ))}
        </Select>
      </Local>

      {/* 난이도 필터 */}
      <Difficulty>
        <Select
          value={levelMin}
          onChange={(e) => setLevelMin(Number(e.target.value))}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </Select>

        <Tilde>~</Tilde>

        <Select
          value={levelMax}
          onChange={(e) => setLevelMax(Number(e.target.value))}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </Select>
      </Difficulty>

      {/* 공포도 필터 */}
      <Horror onClick={() => setIsFearActive(!isFearActive)} active={isFearActive}>
        <RiKnifeBloodLine />
        <span>공포도</span>
        <span style={{ marginLeft: "6px" }}>{isFearActive ? "o" : "x"}</span>
      </Horror>

      {/* 활동성 필터 */}
      <Move onClick={() => setIsActivityActive(!isActivityActive)} active={isActivityActive}>
        <PiSneakerMoveFill />
        <span>활동성</span>
        <span style={{ marginLeft: "6px" }}>{isActivityActive ? "o" : "x"}</span>
      </Move>

      {/* 검색창 */}
      <SearchInput
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleFilterSearch();
        }}
        placeholder="검색어 입력"
      />

      {/* 검색 아이콘 */}
      <Search onClick={handleFilterSearch}>
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
  margin-right: 4px; /* 숫자 간 간격 조절 */
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
