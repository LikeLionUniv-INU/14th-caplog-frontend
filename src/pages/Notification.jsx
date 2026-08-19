import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './Notification.styles';
import LeftArrowIcon from '../assets/icons/LeftArrow.svg';
import RightArrowIcon from '../assets/icons/RightArrow.svg';

export default function Notification() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('전체');
  const filters = ['전체', '일정', '미열람', '추천'];

  // 더미데이터 (임시)
  const dummyNotifications = [
    {
      id: 1,
      type: '일정',
      category: '얼마 남지 않은 일정',
      title: '기숙사 신청 마감이 2일 남았어요.',
      subText: '기숙사 신청 일정',
    },
    {
      id: 2,
      type: '미열람',
      category: '한 번도 열람하지 않은 정보',
      title: "저장한 '공부 효율을 높이는 꿀팁'\n영상을 아직 확인하지 않았어요.",
      subText: '공부 효율을 높이는 공부 꿀팁 BEST 5',
    },
    {
      id: 3,
      type: '추천',
      category: 'AI 추천',
      title: '데이터수학통계 시험이 4일 남았어요.',
      subText: '데이터수학통계 과목',
    },
  ];

  return (
    <S.Container>
      <S.Header>
        <S.BackIcon src={LeftArrowIcon} onClick={() => navigate('/home')} />
        <S.Title>알림</S.Title>
      </S.Header>

      {/* 카테고리 필터 */}
      <S.FilterContainer>
        {filters.map((filter) => (
          <S.FilterChip
            key={filter}
            $isActive={activeFilter === filter}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </S.FilterChip>
        ))}
      </S.FilterContainer>

      {/* 알림 리스트 */}
      <S.ListContainer>
        {dummyNotifications.map((noti) => (
          <S.NotificationCard key={noti.id} $category={noti.category}>
            <S.Thumbnail />
            
            <S.ContentWrapper>
              <S.CardHeader>
                <S.Category>{noti.category}</S.Category>
              </S.CardHeader>
              <S.Message>{noti.title}</S.Message>
              <S.SubText>{noti.subText}</S.SubText>
            </S.ContentWrapper>
            
            <S.NextIcon src={RightArrowIcon} />
          </S.NotificationCard>
        ))}
      </S.ListContainer>
    </S.Container>
  );
}
