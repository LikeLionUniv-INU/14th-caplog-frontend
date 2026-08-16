// 알림 관련
import api from './axios';

// 알림 목록 조회
export const getAlarms = async (page, alarmType) => {
  const response = await api.get(`/api/alarm`, {
    params: { page, alarmType },
  });
  return response.data;
};
