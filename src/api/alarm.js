import api from './axios';

// 알림 목록 조회
export const getAlarms = async (page = 0, alarmType = 'TOTAL') => {
  const response = await api.get('/alarm', {
    params: {
      page,
      alarmType,
    },
  });

  return response.data;
};
