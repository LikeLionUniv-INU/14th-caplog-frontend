import api from './axios';
import { mockAlarmData } from './mockAlarm';

const USE_MOCK = true;

// 알림 목록 조회
export const getAlarms = async (page = 0, alarmType = 'TOTAL') => {
  if (USE_MOCK) {
    return mockAlarmData;
  }

  const response = await api.get('/alarm', {
    params: {
      page,
      alarmType,
    },
  });

  return response.data;
};
