import api from './axios';
import { mockCalendarData } from './mockCalendar';

const USE_MOCK = true;

// 날짜 범위 내 이벤트 조회
export const getCalendarEvents = async ({
  startDateTime,
  endDateTime,
  page = 0,
}) => {
  if (USE_MOCK) {
    // 목업 처리
    return mockCalendarData;
  }

  // 실제 API 요청
  const response = await api.get('/schedules/events', {
    params: {
      startDateTime,
      endDateTime,
      page,
    },
  });

  return response.data;
};
