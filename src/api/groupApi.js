import api from './axios';
import { mockGroupDetail } from './mockGroupDetail';

const USE_MOCK = true;

export const getGroupDetail = async (groupId, page = 0) => {
  if (USE_MOCK) {
    return mockGroupDetail;
  }

  const response = await api.get(`/api/group/details/${groupId}?page=${page}`);

  return response.data;
};

// 그룹 삭제
export const deleteGroup = async (groupId) => {
  // 목업 모드
  if (USE_MOCK) {
    console.log(`[MOCK] 그룹 삭제 요청: ${groupId}`);

    return {
      isSuccess: true,
      code: 'COMMON_200',
      message: '요청에 성공했습니다.',
      result: null,
    };
  }

  // 실제 백엔드 연동
  const response = await api.delete(`/api/group/${groupId}`);

  return response.data;
};

// import api from './axios';

// export const getGroupDetail = async (groupId, page = 0) => {
//   const response = await api.get(`/api/group/details/${groupId}?page=${page}`);

//   return response.data;
// };
