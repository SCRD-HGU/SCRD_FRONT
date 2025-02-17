import React, { useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import dongsan from "../assets/Theme.png";

const regions = ["지역", "강남", "홍대", "종로", "신촌", "잠실"];

// ✅ 랜덤 지역 선택 함수
function getRandomRegion() {
  const availableRegions = regions.slice(1); // "All" 제외
  return availableRegions[Math.floor(Math.random() * availableRegions.length)];
}

const items = [
  { title: "머니머니부동산", img: dongsan, region: getRandomRegion(), branch: "키이스케이프 스테이션점" },
  { title: "그림자 없는 상자", img: dongsan, region: getRandomRegion(), branch: "키이스케이프 스테이션점" },
  { title: "사람들은 그것을 행복...", img: dongsan, region: getRandomRegion(), branch: "키이스케이프 스테이션점" },
  { title: "사랑방", img: dongsan, region: getRandomRegion(), branch: "키이스케이프 스테이션점" },
  { title: "FILM BY BOB", img: dongsan, region: getRandomRegion(), branch: "키이스케이프 스테이션점" },
  { title: "전지적 용사 시점", img: dongsan, region: getRandomRegion(), branch: "키이스케이프 스테이션점" },
  { title: "사람들은 그것을 행복...", img: dongsan, region: getRandomRegion(), branch: "키이스케이프 스테이션점" },
  { title: "사랑방", img: dongsan, region: getRandomRegion(), branch: "키이스케이프 스테이션점" },
  { title: "FILM BY BOB", img: dongsan, region: getRandomRegion(), branch: "키이스케이프 스테이션점" },
  { title: "머니머니부동산", img: dongsan, region: getRandomRegion(), branch: "키이스케이프 스테이션점" },
  { title: "그림자 없는 상자", img: dongsan, region: getRandomRegion(), branch: "키이스케이프 스테이션점" },
];

const CardSwiper = () => {
  const [selectedRegion, setSelectedRegion] = useState("지역");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
              <Card>
                <CardImage src={item.img} alt={item.title} />
                <CardTitle>{item.title}</CardTitle>
                <CardInfo>
                  <RegionText>{item.region} </RegionText>
                  <BranchText>{item.branch}</BranchText>
                </CardInfo>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
        <Overlay />
      </Theme>
    </Container>
  );
};

const Container = styled.div`
  width: 988px;
  height: 211px;
  margin-top: 20px;
  position: relative;
`;

const Region = styled.div`
  color: #FFF;
  font-family: Inter;
  font-size: 22px;
  font-weight: 700;
  cursor: pointer;
  display: inline-block;
  background: transparent;
  padding: 5px 10px;
  border-radius: 5px;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 40px;
  left: 0;
  background: black;
  border: 1px solid white;
  border-radius: 5px;
  overflow: hidden;
  z-index: 100;
`;

const DropdownItem = styled.div`
  color: white;
  padding: 8px 12px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const Theme = styled.div`
  position: relative;
  width: 100%;
  margin-top: 9px;

  /* ✅ Swiper 화살표 크기 조정 및 색 변경 */
  .swiper-button-next,
  .swiper-button-prev {
    color: #808080; /* 회색 화살표 */
    font-size: 24px; /* 크기 줄이기 */
    z-index: 30; /* ✅ 오버레이보다 위로 */
  }

  /* ✅ 화살표 크기 조절 */
  .swiper-button-next::after,
  .swiper-button-prev::after {
    font-size: 24px; /* 기본 크기보다 작게 조정 */
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%; /* 그라데이션 영역 너비 */
  height: 100%;
  background: linear-gradient(90deg, rgba(102, 102, 102, 0.00) 84.5%, #000 100%);
  pointer-events: none; /* Swiper 조작에 영향 없도록 */
  z-index: 10;
`;

const Card = styled.div`
  background: black;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: auto; /* 높이 자동 조정 */
  min-height: 220px; /* 최소 높이 확보 */
`;

const CardImage = styled.img`
  width: 143px;
  height: 170px;
  border-radius: 5px;
  object-fit: cover;
`;

const CardTitle = styled.div`
  color: #FFF;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

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
  font-family: Inter;
  font-size: 8px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  margin-left: 6px;
`;

export default CardSwiper;
