import api from './axios';
import { mockGroupDetail } from './mockGroupDetail';

const USE_MOCK = true;

// 그룹 상세 조회
export const getGroupDetail = async (groupId, page = 0) => {
  if (USE_MOCK) {
    return mockGroupDetail;
  }

  const response = await api.get(`/api/group/details/${groupId}?page=${page}`);

  return response.data;
};

// 그룹 삭제
export const deleteGroup = async (groupId) => {
  if (USE_MOCK) {
    console.log(`[MOCK] 그룹 삭제 요청: ${groupId}`);

    return {
      isSuccess: true,
      code: 'COMMON_200',
      message: '요청에 성공했습니다.',
      result: null,
    };
  }

  const response = await api.delete(`/api/group/${groupId}`);

  return response.data;
};

// 그룹 수정
export const updateGroup = async (groupId, groupName, groupCategory) => {
  if (USE_MOCK) {
    console.log('[MOCK] 그룹 수정 요청:', {
      groupId,
      groupName,
      groupCategory,
    });

    return {
      isSuccess: true,
      code: 'COMMON_200',
      message: '요청에 성공했습니다.',
      result: {
        groupName,
        groupCategory,
      },
    };
  }

  const response = await api.patch(`/api/group/${groupId}`, {
    groupName,
    groupCategory,
  });

  return response.data;
};

// 그룹 카테고리 목록 조회
// TODO: 팀원 API 파일 받으면 이 함수는 삭제하고 팀원 함수 import
export const getCategoryList = async () => {
  // 카테고리 목록 임시 목업
  if (USE_MOCK) {
    return {
      isSuccess: true,
      code: 'COMMON_200',
      message: '요청에 성공했습니다.',
      result: ['STUDY', 'SCHOOL', 'DAILY', 'ETC'],
    };
  }

  const response = await api.get('/api/group/categories');

  return response.data;
};

// import api from './axios';

// export const getGroupDetail = async (groupId, page = 0) => {
//   const response = await api.get(`/api/group/details/${groupId}?page=${page}`);

//   return response.data;
// };
