import { useState } from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import * as S from './Calendar.style';
import PreviewBox from './PreviewBox';

// 달력페이지 전용 더미데이터
const schedules = {
  '2026-08-03': [
    {
      id: 1,
      title: '데이터수학통계 중간고사',
      image: 'https://placehold.co/177x178',
    },
    {
      id: 2,
      title: '팀플 회의',
      image: 'https://placehold.co/177x178',
    },
  ],

  '2026-08-06': [
    {
      id: 3,
      title: '기숙사 신청 마감',
      image: 'https://placehold.co/177x178',
    },
  ],
};

const formatDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const selectedDateKey = formatDateKey(selectedDate);
  const selectedSchedules = schedules[selectedDateKey] || [];

  return (
    <S.CalendarContainer>
      <S.Header>
        <h2>캘린더</h2>
      </S.Header>

      <S.CalendarBox>
        <ReactCalendar
          value={selectedDate}
          onChange={setSelectedDate}
          calendarType="gregory"
          prev2Label={null}
          next2Label={null}
          formatDay={(locale, date) => date.getDate()}
          tileContent={({ date, view }) => {
            if (view !== 'month') return null;

            const dateKey = formatDateKey(date);
            const scheduleCount = schedules[dateKey]?.length || 0;

            if (scheduleCount === 0) return null;

            return (
              <S.DotContainer>
                {Array.from({ length: scheduleCount }).map((_, index) => (
                  <S.Dot key={index} />
                ))}
              </S.DotContainer>
            );
          }}
        />
      </S.CalendarBox>

      <S.Divider />

      <S.ScheduleSection>
        <S.ScheduleTitle>오늘의 일정</S.ScheduleTitle>

        {selectedSchedules.length === 0 ? (
          <S.EmptyText>오늘 일정이 없어요!</S.EmptyText>
        ) : (
          <S.ScheduleList>
            {selectedSchedules.map((schedule) => (
              <PreviewBox
                key={schedule.id}
                image={schedule.image}
                title={schedule.title}
              />
            ))}
          </S.ScheduleList>
        )}
      </S.ScheduleSection>
    </S.CalendarContainer>
  );
}

export default Calendar;
