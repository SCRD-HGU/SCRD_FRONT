import React, { useState } from "react";
import { useQuery } from "react-query";
import useAxiosInstance from "../api/axiosInstance";
import styled from "styled-components";
import { Link } from "react-router-dom";
import dongsan from "../assets/Theme.png";
import { FaAngleDown } from "react-icons/fa";

const regionGroups = {
  "서울": ["강남", "홍대", "건대", "잠실", "신림", "혜화", "신촌", "동작", "성수", "노원", "명동"],
  "경기/인천": ["인천", "고양", "안산", "안양", "수원", "화성", "평택"],
  "충청": ["대전", "천안", "충주"],
  "경상": ["부산", "대구"],
  "전라": ["익산", "전주"],
  "제주": ["제주", "서귀포"],
};

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

  const groupRegionData = (data) => {
    const grouped = {};
    const includedRegions = new Set();

    Object.entries(regionGroups).forEach(([groupName, subRegions]) => {
      const regionCounts = subRegions.map((region) => {
        const count = data.filter((item) => item.location === region).length;
        includedRegions.add(region);
        return { region, count };
      });

      const total = regionCounts.reduce((sum, rc) => sum + rc.count, 0);
      grouped[groupName] = { regions: regionCounts, total };
    });

    const allRegions = [...new Set(data.map((item) => item.location))];
    const otherRegions = allRegions.filter((r) => !includedRegions.has(r));

    if (otherRegions.length > 0) {
      const otherCounts = otherRegions.map((region) => {
        const count = data.filter((item) => item.location === region).length;
        return { region, count };
      });

      const total = otherCounts.reduce((sum, rc) => sum + rc.count, 0);
      grouped["기타"] = { regions: otherCounts, total };
    }

    return grouped;
  };

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
          {Object.entries(groupRegionData(dataToShow)).map(([groupName, { regions, total }]) => (
            <div key={groupName}>
              <GroupTitle>📍 {groupName}</GroupTitle>
              {regions.map(({ region, count }) => (
                <DropdownItem
                  key={region}
                  onClick={() => {
                    setSelectedRegion(region);
                    setIsDropdownOpen(false);
                  }}
                >
                  {region} ({count})
                </DropdownItem>
              ))}
              <SubTotal>소계: {total}건</SubTotal>
              <Divider />
            </div>
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

// ✅ styled-components
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
  display: block;
  max-height: 300px;
  max-width: 300px;
  padding: 12px;
  overflow-y: auto;
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
const GroupTitle = styled.div`
  font-weight: bold;
  color: #fff;
  margin-bottom: 4px;
`;
const SubTotal = styled.div`
  font-size: 12px;
  color: #bbb;
  margin-top: 4px;
  margin-bottom: 8px;
`;
const Divider = styled.hr`
  border: 0;
  height: 1px;
  background: #333;
  margin: 4px 0 10px;
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