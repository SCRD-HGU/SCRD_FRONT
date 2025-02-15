import { useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";

  const Reservation = () => {
    const today = dayjs();
    const [startDate, setStartDate] = useState(today);
    const [selectedDate, setSelectedDate] = useState(today.format("YYYY-MM-DD"));

    console.log("🚀 현재 날짜(today):", today.format("YYYY-MM-DD"));
    console.log("📅 선택된 날짜(selectedDate):", selectedDate);

    const timeSlots = {
      "2025-02-16": ["11:00", "12:10", "13:20", "14:30", "18:00"],
      "2025-02-17": ["10:00", "12:00", "15:00"],
      "2025-02-18": ["09:30", "11:30", "16:00"],
    };


    console.log("🕒 예약 가능 시간 목록(timeSlots):", timeSlots);
    console.log("🕒 선택된 날짜의 예약 가능 시간:", timeSlots[selectedDate] || "없음");
    
    const days = Array.from({ length: 7 }, (_, i) => {
      const date = startDate.add(i, "day");
      const dateStr = date.format("YYYY-MM-DD");
    
      // 한글 요일 매핑
      const dayOfWeekMap = ["일", "월", "화", "수", "목", "금", "토"];
      const dayIndex = date.day(); // 0(일) ~ 6(토)
      let dayLabel = dayOfWeekMap[dayIndex]; // 기본 한글 요일 설정
    
      // 오늘/내일 예외 처리
      if (dateStr === today.format("YYYY-MM-DD")) {
        dayLabel = "오늘";
      } else if (dateStr === today.add(1, "day").format("YYYY-MM-DD")) {
        dayLabel = "내일";
      }

      console.log(`📌 날짜 리스트 생성: ${dateStr}, 요일: ${dayLabel}`);
    
      return {
        date: dateStr,
        label: date.format("M.D"), // ex) "2.11"
        day: dayLabel, // 한글 요일 or "오늘" or "내일"
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
          <NoTimeSlot>예약 가능한 시간이 없습니다.</NoTimeSlot>
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
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center; /* 중앙 정렬 */
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
`;

export default Reservation;
