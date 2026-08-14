// 인증/권한 관련
import api from './axios';

// 로그인
export const login = async (username, password) => {
  const response = await api.post('/auth/login', {
    username,
    password,
  });

  return response.data;
};

// 회원가입
export const signup = async (username, password) => {
  const response = await api.post('/auth/signup', {
    username,
    password,
  });

  return response.data;
};

// 권한 허용 여부 전송
export const putAuth = async (isApproved) => {
  const response = await api.put('/users/photo-consent', {
    params: { isApproved },
  });

  return response.data;
};

// 권한 확인 여부 확인
export const checkAuth = async () => {
  const response = await api.get('/users/photo-consent');

  return response.data;
};
