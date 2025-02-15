import React, { useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import dongsan from "../assets/Theme.png";

const items = [
  { title: "머니머니부동산", img: dongsan },
  { title: "그림자 없는 상자", img: dongsan },
  { title: "사람들은 그것을 행복...", img: dongsan },
  { title: "사랑방", img: dongsan },
  { title: "FILM BY BOB", img: dongsan },
  { title: "전지적 용사 시점", img: dongsan },
  { title: "사람들은 그것을 행복...", img: dongsan },
  { title: "사랑방", img: dongsan },
  { title: "FILM BY BOB", img: dongsan },
  { title: "머니머니부동산", img: dongsan },
  { title: "그림자 없는 상자", img: dongsan },
];

const regions = ["강남", "홍대", "종로", "신촌", "잠실"];

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
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
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
  margin-top: 9px;
`;

const Card = styled.div`
  width: 150px;
  height: 200px;
  background: black;
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
  color: white;
  flex-shrink: 0;
`;

const CardImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
`;

const CardTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-top: 10px;
`;

export default CardSwiper;
