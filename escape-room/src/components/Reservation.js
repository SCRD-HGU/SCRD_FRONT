import { useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";

  const Reservation = () => {
    const today = dayjs();
    const [startDate, setStartDate] = useState(today);
    const [selectedDate, setSelectedDate] = useState(today.format("YYYY-MM-DD"));

    const timeSlots = {
      "2024-02-06": ["11:00", "12:10", "13:20", "14:30", "18:00"],
      "2024-02-07": ["10:00", "12:00", "15:00"],
      "2024-02-08": ["09:30", "11:30", "16:00"],
    };
    
    const days = Array.from({ length: 7 }, (_, i) => {
      const date = startDate.add(i, "day");
      return {
        date: date.format("YYYY-MM-DD"),
        label: date.format("M.D"),
        day: date.format("dd"),
      };
    });

    const handleDateSelect = (date) => {
      setSelectedDate(date);
    };

    const goNextWeek = () => {
      setStartDate(startDate.add(7, "day"));
    };

    const goPreWeek = () => {
      if(startDate.isAfter(today, "day")) {
        setStartDate(startDate.subtract(7, "day"));
      }
    };

  return (
    <ReservationContainer>
      <Text>
        예약 시간
      </Text>
      <DateBox>
        <NavButton onClick={goPreWeek}>&lt;</NavButton>
        <DateList>
          {days.map((day, index) => (
            <DateItem
              key={index}
              isSelected={selectedDate === day.date}
              onClick={() => handleDateSelect(day.date)}
            >
              <DateNumber>{day.label}</DateNumber>
              <DateLabel>{day.day}</DateLabel>
            </DateItem>
          ))}
        </DateList>
        <NavButton onClick={goNextWeek}>&gt;</NavButton>
      </DateBox>
      <Line>
        2
      </Line>
      <TimeContainer>
        {(timeSlots[selectedDate] || []).map((time, index) => (
          <TimeSlot key={index}>{time}</TimeSlot>
        ))}
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
  padding: 10px 36px;
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
  justify-content: center;
  width: 1024px;

  margin-top: 20px;
`;

const DateList = styled.div`
  display: flex;
  gap: 12px;
`;

const DateItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  border-radius: 12px;
  border: ${({ isSelected }) => (isSelected ? "none" : "2px solid #D32F2F")};
  background-color: ${({ isSelected }) => (isSelected ? "#D32F2F" : "transparent")};
  color: #FFF;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;

const DateNumber = styled.div`
  font-size: 18px;
`;

const DateLabel = styled.div`
  font-size: 14px;
`;

const NavButton = styled.button`
  font-size: 24px;
  color: #888;
  cursor: pointer;
  background: none;
  border: none;
`;

const TimeContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const TimeSlot = styled.div`
  padding: 10px 16px;
  border: 2px solid #D32F2F;
  border-radius: 8px;
  color: #FFF;
  font-size: 16px;
  cursor: pointer;
  background: none;
`;

const Line = styled.div`
color: #FFF;
`;

const Time = styled.div`
`;

export default Reservation;
