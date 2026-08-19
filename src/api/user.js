// 유저 정보 관련
import api from './axios';

// 사용자 프로필 정보 조회
export const getUserInfo = async () => {
  const response = await api.get('/users');

  return response.data;
};

// 프로필 사진 URL 조회
export const getProfileUrl = async () => {
  const response = await api.get('/users/profile-img');

  return response.data;
};

// 사용자 프로필 설정
export const putUserInfo = async (profileImg, userName) => {
  const response = await api.post('/users/settings/profile', {
    profileImg,
    userName,
  });

  return response.data;
};
