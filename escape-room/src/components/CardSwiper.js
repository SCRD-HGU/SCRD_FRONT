import React, { useState } from "react";
import { useQuery } from "react-query";
import useAxiosInstance from "../api/axiosInstance";
import styled from "styled-components";
import { Link } from "react-router-dom";
import dongsan from "../assets/Theme.png";
import { FaAngleDown } from "react-icons/fa";

const CardSwiper = ({ searchedItems = [] }) => {
  const [selectedRegion, setSelectedRegion] = useState("전체");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const axiosInstance = useAxiosInstance();

  const {
    data: items = [],
    isLoading,
    isError,
  } = useQuery(
    ["themes"],
    () => axiosInstance.get("/api/theme?sort=rating").then((res) => res.data),
    {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      enabled: searchedItems.length === 0,
    }
  );

  const dataToShow = searchedItems.length > 0 ? searchedItems : items;
  const locationList = ["전체", ...new Set(dataToShow.map((item) => item.location))];

  const filteredItems =
    selectedRegion === "전체"
      ? dataToShow
      : dataToShow.filter((item) => item.location === selectedRegion);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load themes.</p>;

  return (
    <Container>
      <Region onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <span>{selectedRegion}</span>
        <FaAngleDown style={{ fontSize: "16px" }} />
      </Region>

      {isDropdownOpen && (
        <Dropdown>
          {locationList.map((region, idx) => (
            <DropdownItem
              key={idx}
              onClick={() => {
                setSelectedRegion(region);
                setIsDropdownOpen(false);
              }}
            >
              {region}
            </DropdownItem>
          ))}
        </Dropdown>
      )}

      <CardList>
        {filteredItems.map((item, idx) => (
          <StyledLink key={idx} to={`/detail/${item.id}`}>
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
  margin-top: 20px;
  position: relative;
`;
const CardList = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  margin-top: 16px;
`;
const Region = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
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
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(5, auto);
  gap: 4px;
  max-height: 200px;
  max-width: 300px;
  padding: 8px;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
`;
const DropdownItem = styled.div`
  color: white;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 14px;
  border-radius: 4px;

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
  width: 26.6px;
  height: 10px;
  padding: 4px 5px;
  justify-content: center;
  align-items: center;
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
