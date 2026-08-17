import { mockScheduleData } from './mockSchedule';

// 저장된 정보 목록 조회
export const getSchedules = async ({
  page = 0,
  category = 'TOTAL',
  searchWords = '',
} = {}) => {
  let list = mockScheduleData.result.list;

  // 카테고리 필터
  if (category !== 'TOTAL') {
    list = list.filter((item) => item.schedule.group === category);
  }

  // 검색
  if (searchWords) {
    list = list.filter((item) =>
      item.schedule.title.toLowerCase().includes(searchWords.toLowerCase()),
    );
  }

  return {
    ...mockScheduleData,
    result: {
      ...mockScheduleData.result,

      page: {
        ...mockScheduleData.result.page,
        pageNumber: page,
      },

      list,
    },
  };
};
