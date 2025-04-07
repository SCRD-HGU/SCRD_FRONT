import { useEffect, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { tokenState } from "../store/atom";
import axios from "axios";

const Reservation = () => {
  const today = dayjs();
  const [startDate, setStartDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(today.format("YYYY-MM-DD"));
  const [timeSlots, setTimeSlots] = useState({});
  const { id } = useParams();
  const accessToken = useRecoilValue(tokenState);

  // ✅ API 호출하여 예약 가능 시간 받아오기
  useEffect(() => {
    const fetchReservationData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/theme/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const available = res.data.themeAvailableTime || {};
        setTimeSlots(available);
      } catch (err) {
        console.error("❌ 예약 시간 불러오기 실패:", err);
      }
    };

    if (accessToken && id) {
      fetchReservationData();
    }
  }, [accessToken, id]);

  const days = Array.from({ length: 7 }, (_, i) => {
    const date = startDate.add(i, "day");
    const dateStr = date.format("YYYY-MM-DD");
    const isToday = date.isSame(today, "day");

    const dayOfWeekMap = ["일", "월", "화", "수", "목", "금", "토"];
    const dayIndex = date.day();
    const dayLabel = dayOfWeekMap[dayIndex];

    return {
      date: dateStr,
      label: isToday ? date.format("M/D") : date.format("D"),
      day: dayLabel,
    };
  });

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const goNextWeek = () => {
    setStartDate(startDate.add(7, "day"));
  };

  const goPreWeek = () => {
    if (startDate.isAfter(today, "day")) {
      setStartDate(startDate.subtract(7, "day"));
    }
  };

  return (
    <ReservationContainer>
      <Text>예약 시간</Text>
      <DateBox>
        <NavButton onClick={goPreWeek}>&lt;</NavButton>
        <DateList>
          {days.map((day, index) => {
            const isToday = day.date === today.format("YYYY-MM-DD");
            return (
              <DateItem
                key={index}
                isSelected={selectedDate === day.date}
                isToday={isToday}
                onClick={() => handleDateSelect(day.date)}
              >
                <DateNumber>{day.label}</DateNumber>
                <DateLabel>{day.day}</DateLabel>
              </DateItem>
            );
          })}
        </DateList>
        <NavButton onClick={goNextWeek}>&gt;</NavButton>
      </DateBox>
      <Line />
      <TimeContainer>
        {timeSlots[selectedDate] && timeSlots[selectedDate].length > 0 ? (
          timeSlots[selectedDate].map((time, index) => (
            <TimeSlot key={index}>{time.replace(":", " : ")}</TimeSlot>
          ))
        ) : (
          <NoTimeSlot>
            예약 가능한 시간대가 없거나 해당 사이트의 서버 점검으로 인해 조회가 불가능합니다.
          </NoTimeSlot>
        )}
      </TimeContainer>
    </ReservationContainer>
  );
};

const ReservationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 59px;
  width: 1024px;
  padding: 0 36px;
`;

const Text = styled.div`
  color: #FFF;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const DateBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* 기존 center → space-between */
  width: 100%;

  margin-top: 30px;
`;

const DateList = styled.div`
  display: flex;
  gap: 62px;
`;

const DateItem = styled.div`
  width: 73px;
  height: 93px;
  gap: 13px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px;
  border-radius: 12px;
  background-color: ${({ isSelected }) => (isSelected ? "#D90206" : "transparent")};
  border: ${({ isToday, isSelected }) =>
    isSelected ? "1px solid #D90206" : isToday ? "2px solid #D32F2F" : "none"};
  cursor: pointer;
  backdrop-filter: ${({ isSelected }) => (isSelected ? "blur(2px)" : "none")};
`;

const DateNumber = styled.div`
  color: #FFF;
  font-family: Inter;
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
`;

const DateLabel = styled.div`
  color: #FFF;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const NavButton = styled.button`
  font-size: 24px;
  color: #888;
  cursor: pointer;
  background: none;
  border: none;
`;

const Line = styled.div`
  width: 960px;
  height: 2.5px;
  background-color: #9D9D9D;
  margin: 16px auto 0;
  border-radius: 1.25px;
`;

const TimeContainer = styled.div`
  display: flex;
  gap: 34px;
  flex-wrap: wrap;
  justify-content: flex-start; /* 중앙 정렬 */
  margin-top: 20px; /* 위쪽 구분선과 간격 */
  min-height: 50px; /* 최소 높이 설정 */
`;


const TimeSlot = styled.div`
  color: #F3F3F3;
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  white-space: nowrap;
  display: flex;
  width: 86.029px;
  height: 34.798px;
  padding: 7px 17px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;

  border-radius: 10px;
  border: 1px solid var(--Foundation-Red-Dark, #B80205);
  background: #2D0000;
  backdrop-filter: blur(2px);

  ${({ isSelected }) =>
    isSelected &&
    `
    background: #D90206;
    color: white;
    border: 2px solid #D90206;
  `}
`;

const NoTimeSlot = styled.div`
  color: #929292;
  font-family: Inter;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  margin-left: 200px;
  margin-top: 63px;
`;

export default Reservation;
