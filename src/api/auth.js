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
