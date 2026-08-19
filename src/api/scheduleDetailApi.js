import api from './axios';
import { mockScheduleDetail } from './mockScheduleDetail';

const USE_MOCK = true;

// 일정 상세 조회 (상세페이지 전용)
export const getScheduleDetail = async (scheduleId) => {
  if (USE_MOCK) {
    return mockScheduleDetail;
  }

  const response = await api.get(`/schedule/details/${scheduleId}`);

  return response.data;
};

// 일정 삭제 (상세페이지 전용)
export const deleteSchedule = async (scheduleId) => {
  if (USE_MOCK) {
    console.log(`[MOCK] 일정 삭제 요청: ${scheduleId}`);

    return {
      isSuccess: true,
      code: 'COMMON_200',
      message: '요청에 성공했습니다.',
      result: {
        userName: null,
      },
    };
  }

  const response = await api.delete(`/schedule/${scheduleId}`);

  return response.data;
};
