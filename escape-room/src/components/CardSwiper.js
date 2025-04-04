import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  tokenState,
  refreshTokenState,
} from "../store/atom"; // ✅ store/atom 경로 맞춰야 해
import styled from "styled-components";
import { Link } from "react-router-dom";  
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import dongsan from "../assets/Theme.png";

const regions = ["지역", "강남", "홍대", "종로", "신촌", "잠실"];

function getRandomRegion() {
  const availableRegions = regions.slice(1);
  return availableRegions[Math.floor(Math.random() * availableRegions.length)];
}

const CardSwiper = () => {
  const [selectedRegion, setSelectedRegion] = useState("지역");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [accessToken, setAccessToken] = useRecoilState(tokenState);
  const [refreshToken, setRefreshToken] = useRecoilState(refreshTokenState);

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
      <Region onClick={toggleDropdown}>{selectedRegion} ⌄</Region>
      {isDropdownOpen && (
        <Dropdown>
          {regions.map((region, index) => (
            <DropdownItem key={index} onClick={() => selectRegion(region)}>
              {region}
            </DropdownItem>
          ))}
        </Dropdown>
      )}
      <Theme>
        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={6}
          navigation
        >
          {items.map((item, index) => (
            <SwiperSlide key={index}>
              <StyledLink to={`/detail`}>
                <Card>
                  <CardImage src={item.img || dongsan} alt={item.title} />
                  <CardTitle>{item.title}</CardTitle>
                  <CardInfo>
                    <RegionText>{item.region}</RegionText>
                    <BranchText>{item.branch}</BranchText>
                  </CardInfo>
                </Card>
              </StyledLink>
            </SwiperSlide>
          ))}
        </Swiper>
        <Overlay />
      </Theme>
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

const Region = styled.div`
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

const Theme = styled.div`
  margin-top: 9px;
  .swiper-button-next, .swiper-button-prev {
    color: #808080;
    font-size: 24px;
    z-index: 30;
  }
  .swiper-button-next::after, .swiper-button-prev::after {
    font-size: 24px;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, rgba(102, 102, 102, 0.00) 84.5%, #000 100%);
  pointer-events: none;
  z-index: 10;
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
  padding: 4px 5px;
  border-radius: 20px;
  border: 1px solid #FFF;
  background: #FFF;
  color: #000;
  font-size: 7px;
  font-weight: 700;
`;

const BranchText = styled.div`
  color: #BABABA;
  font-size: 8px;
  font-weight: 700;
  margin-left: 6px;
`;

export default CardSwiper;