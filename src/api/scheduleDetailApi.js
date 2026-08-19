import api from './axios';
import { mockScheduleDetail } from './mockScheduleDetail';

const USE_MOCK = true;

// 일정 상세 조회 (상세페이지 전용)
export const getScheduleDetail = async (scheduleId) => {
  if (USE_MOCK) {
    return mockScheduleDetail;
  }

  const response = await api.get(`/api/schedule/details/${scheduleId}`);

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

  const response = await api.delete(`/api/schedule/${scheduleId}`);

  return response.data;
};

// ========================================
// 그룹/단일 일정 전체 조회 (주제 목록)
// GET /api/group?page={page}
//
// 다른 사람이 만든 실제 API 함수가 들어오면
// 이 함수는 나중에 교체해도 됨
// ========================================
export const getGroupList = async (page = 0) => {
  // 서버 연결 전 목업
  if (USE_MOCK) {
    return {
      isSuccess: true,
      code: 'COMMON_200',
      message: '요청에 성공했습니다.',
      result: {
        page: {
          totalPage: 1,
          pageNumber: page,
        },

        groupList: [
          {
            groupId: 1,
            groupName: '데이터수학통계 과목',
          },
          {
            groupId: 2,
            groupName: '졸업 프로젝트',
          },
          {
            groupId: 3,
            groupName: '개인 일정',
          },
        ],
      },
    };
  }

  // 실제 서버 연결
  const response = await api.get('/group', {
    params: { page },
  });

  return response.data;
};

// ========================================
// 일정 수정 (상세페이지 전용)
// PATCH /api/schedule/{scheduleId}
// ========================================
export const updateSchedule = async (scheduleId, updateData) => {
  // 서버 연결 전 목업
  if (USE_MOCK) {
    console.log(`[MOCK] 일정 수정 요청: ${scheduleId}`);
    console.log('[MOCK] 수정 데이터:', updateData);

    return {
      isSuccess: true,
      code: 'COMMON_200',
      message: '요청에 성공했습니다.',
      result: updateData,
    };
  }

  // 실제 서버 연결
  const response = await api.patch(`/api/schedule/${scheduleId}`, updateData);

  return response.data;
};
