import PreviewBox from './PreviewBox';
import PreviewFilter from './PreviewFilter';
import SearchBar from './SearchBar';
import * as S from './Home.style';
import logo from '../assets/logo.svg';
import alarm from '../assets/alarm.svg';
import { useNavigate } from 'react-router-dom';
import { getAlarms } from '../api/alarm';
import { useEffect, useState } from 'react';
import { getSchedules } from '../api/schedule';

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const pendingUrl = localStorage.getItem('pendingSharedImage');
    if (pendingUrl) {
      localStorage.removeItem('pendingSharedImage');
      navigate('/upload', { state: { sharedUrl: pendingUrl } });
    }
  }, [navigate]);

  const [alarmCount, setAlarmCount] = useState(0);

  // 홈 화면에 보여줄 알림 말풍선
  const [latestAlarm, setLatestAlarm] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState('TOTAL');

  const [schedules, setSchedules] = useState([]);

  const [memorySchedules, setMemorySchedules] = useState([]);

  // 기억해야 하는 일정박스 관련
  useEffect(() => {
    const fetchMemorySchedules = async () => {
      try {
        const data = await getSchedules({
          page: 0,
          category: 'TOTAL',
          searchWords: '',
        });

        setMemorySchedules(data.result.list);
      } catch (error) {
        console.error('기억해야 할 정보 조회 실패:', error);
      }
    };

    fetchMemorySchedules();
  }, []);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const data = await getSchedules({
          page: 0,
          category: selectedCategory,
          searchWords: '',
        });

        setSchedules(data.result.list);
      } catch (error) {
        console.error('저장된 정보 조회 실패:', error);
      }
    };

    fetchSchedules();
  }, [selectedCategory]);

  useEffect(() => {
    const fetchAlarms = async () => {
      try {
        const data = await getAlarms();

        setAlarmCount(data.result.alarmCount);

        const unopenedAlarm = data.result.notifications?.find((alarm) => !alarm.isOpened);

        setLatestAlarm(unopenedAlarm ?? null);
      } catch (error) {
        console.error('알림 조회 실패:', error);
      }
    };

    fetchAlarms();
  }, []);

  // 14일 이내 일정 연산
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const memoryItems = memorySchedules
    .flatMap((item) =>
      (item.events || [])
        .map((event) => {
          const eventDate = new Date(event.dateTime);
          eventDate.setHours(0, 0, 0, 0);

          const diffTime = eventDate.getTime() - today.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          return {
            id: item.id,
            isGroup: item.isGroup,
            title: event.title,
            dday: diffDays,
          };
        })
        .filter((event) => event.dday >= 0 && event.dday <= 14),
    )
    .sort((a, b) => a.dday - b.dday);

  return (
    <S.HomeContainer>
      <S.Header>
        <S.Logo src={logo} alt="Caplog" />

        <S.AlarmArea>
          {latestAlarm && <S.AlarmMessage>{latestAlarm.message}</S.AlarmMessage>}

          <S.AlarmButton onClick={() => navigate('/notification')}>
            <img src={alarm} alt="알람" />

            {alarmCount > 0 && <S.AlarmBadge>{alarmCount}</S.AlarmBadge>}
          </S.AlarmButton>
        </S.AlarmArea>
      </S.Header>

      <S.MemoryBox>
        <S.SpringRow>
          {Array.from({ length: 20 }).map((_, index) => (
            <S.Spring key={index} />
          ))}
        </S.SpringRow>
        <S.MemoryTitle>기억해야 할 정보가 있어요!</S.MemoryTitle>

        <S.MemoryList>
          {memoryItems.map((memory) => (
            <S.MemoryItem
              key={`${memory.id}-${memory.title}`}
              onClick={() => navigate(memory.isGroup ? `/group/${memory.id}` : `/detail/${memory.id}`)}
            >
              <span>{memory.title}</span>

              <S.MemoryRight>
                <S.Dday $active={memory.dday <= 1}>{memory.dday === 0 ? 'D-DAY' : `D-${memory.dday}`}</S.Dday>

                <S.ArrowButton type="button">›</S.ArrowButton>
              </S.MemoryRight>
            </S.MemoryItem>
          ))}
        </S.MemoryList>
      </S.MemoryBox>

      <S.SearchSection>
        <SearchBar onClick={() => navigate('/Archive')} />
      </S.SearchSection>

      <S.PreviewSection>
        <S.PreviewHeader>
          <S.PreviewTitle>저장한 캡처 정보</S.PreviewTitle>
          <S.AllButton onClick={() => navigate('/archive')}>전체 보기 ›</S.AllButton>
        </S.PreviewHeader>

        <S.FilterSection>
          <PreviewFilter selectedFilter={selectedCategory} onFilterChange={setSelectedCategory} />
        </S.FilterSection>

        <S.PreviewList>
          {schedules.map((item) => (
            <PreviewBox
              key={item.id}
              id={item.id}
              image={item.pictures?.[0]?.captureImg}
              title={item.schedule.title}
              isGroup={item.isGroup}
              isNew={item.isNew}
              elementCount={item.elementCount}
            />
          ))}
        </S.PreviewList>
      </S.PreviewSection>
    </S.HomeContainer>
  );
}

export default Home;
