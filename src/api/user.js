// 유저 정보 관련
import api from './axios';

// 유저 정보 조회
export const getUserInfo = async () => {
  const response = await api.get('/users');

  return response.data;
};
