import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  tokenState,
  refreshTokenState,
} from "../store/atom"; // ✅ store/atom 경로 맞춰야 해
import styled from "styled-components";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import dongsan from "../assets/Theme.png";
import { FaAngleDown } from "react-icons/fa";

const CardSwiper = () => {
  const [selectedRegion, setSelectedRegion] = useState("전체"); // "전체"로 기본값 변경
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [accessToken, setAccessToken] = useRecoilState(tokenState);
  const [refreshToken, setRefreshToken] = useRecoilState(refreshTokenState);
  
  // 🆕 고유한 지역(location) 리스트 추출
  const locationList = ["전체", ...new Set(items.map((item) => item.location))];
  
  // 🆕 지역 필터링된 항목들
  const filteredItems =
    selectedRegion === "전체"
      ? items
      : items.filter((item) => item.location === selectedRegion);

  // ✅ accessToken 만료 여부 검사 함수
  const isTokenExpired = () => {
    try {
      const payload = JSON.parse(atob(accessToken.split(".")[1]));
      return payload.exp * 1000 < Date.now();
    } catch (e) {
      return true;
    }
  };

  // ✅ 토큰 확인하고 theme API 요청하는 함수
  const tryRequest = async (access, refresh) => {
    const headers = {
      Authorization: `Bearer ${access}`,
      ...(refresh && { "X-Refresh-Token": refresh }),
    };

    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/theme?sort=rating`, {
        headers,
      });

      const newAccessToken = response.headers["authorization"]?.split(" ")[1];
      const newRefreshToken = response.headers["x-refresh-token"];

      if (newAccessToken) {
        setAccessToken(newAccessToken);
        console.log("✅ 새 accessToken 저장:", newAccessToken);
      }
      if (newRefreshToken) {
        setRefreshToken(newRefreshToken);
        console.log("✅ 새 refreshToken 저장:", newRefreshToken);
      }

      console.log("🎯 테마 응답:", response.data);
      setItems(response.data);
    } catch (error) {
      console.error("❌ 서버 요청 실패:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (!accessToken) {
      console.warn("⚠️ accessToken 없음. 요청 생략");
      return;
    }

    if (isTokenExpired()) {
      tryRequest(accessToken, refreshToken);
    } else {
      tryRequest(accessToken);
    }
  }, [accessToken]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectRegion = (region) => {
    setSelectedRegion(region);
    setIsDropdownOpen(false);
  };

  return (
    <Container>
      <Region onClick={toggleDropdown}>
        <span>{selectedRegion}</span>
        <FaAngleDown style={{ fontSize: "16px" }} />
      </Region>
      {isDropdownOpen && (
        <Dropdown>
          {locationList.map((region, index) => (
            <DropdownItem key={index} onClick={() => selectRegion(region)}>
              {region}
            </DropdownItem>
          ))}
        </Dropdown>
      )}
      <CardList>
        {filteredItems.map((item, index) => (
          <StyledLink key={index} to={`/detail/${item.id}`}>
            <Card>
              <CardImage src={item.image || dongsan} alt={item.title} />
              <CardTitle>{item.title}</CardTitle>
              <CardInfo>
                <RegionText>{item.location}</RegionText>
                <BranchText>{`${item.brand} ${item.branch}`}</BranchText>
              </CardInfo>
            </Card>
          </StyledLink>
        ))}
      </CardList>
    </Container>
  );
};
// ✅ styled-components는 그대로 유지

const Container = styled.div`
  width: 988px;
  height: 211px;
  margin-top: 20px;
  position: relative;
`;

const CardList = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr); /* 한 줄에 6개 */
  gap: 10px; /* 카드 간 간격 (기존 swiper 간격 비슷하게 유지) */
  margin-top: 16px;
`;

const Region = styled.div`
  display: inline-flex;
  align-items: center; /* 텍스트 + 아이콘 수직 정렬 */
  gap: 6px; /* 텍스트와 아이콘 간격 */
  color: #FFF;
  font-size: 22px;
  font-weight: 700;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 40px;
  background: black;
  border: 1px solid white;
  border-radius: 5px;
  z-index: 100;
`;

const DropdownItem = styled.div`
  color: white;
  padding: 8px 12px;
  cursor: pointer;
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Card = styled.div`
  background: black;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 220px;
`;

const CardImage = styled.img`
  width: 143px;
  height: 170px;
  border-radius: 5px;
  object-fit: cover;
`;

const CardTitle = styled.div`
  color: #FFF;
  font-size: 14px;
  font-weight: 700;
  margin-top: 10px;
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: row;
`;

const RegionText = styled.div`
  display: flex;
  width: 26.629px;
  height: 10px;
  padding: 4px 5px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border: 1px solid #FFF;
  background: #FFF;

  color: #000;
  font-family: Pretendard;
  font-size: 7px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const BranchText = styled.div`
  color: #BABABA;
  font-size: 8px;
  font-weight: 700;
  margin-left: 6px;
`;

export default CardSwiper;