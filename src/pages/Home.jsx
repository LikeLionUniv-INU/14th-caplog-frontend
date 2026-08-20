import PreviewBox from './PreviewBox';
import PreviewFilter from './PreviewFilter';
import SearchBar from './SearchBar';
import * as S from './Home.style';
import logo from '../assets/logo.svg';
import alarm from '../assets/alarm.svg';
import { useNavigate } from 'react-router-dom';
import { getAlarms, getAlarmSettings } from '../api/notification';
import { useEffect, useState } from 'react';
import { getSchedules } from '../api/schedule';
import api from '../api/axios';

function Home() {
  const navigate = useNavigate();

  const [alarmCount, setAlarmCount] = useState(0);
  const [memoryItems, setMemoryItems] = useState([]);
  const [latestAlarm, setLatestAlarm] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState('TOTAL');
  const [schedules, setSchedules] = useState([]);

  // ========================================
  // 저장한 캡처 정보 조회
  // ========================================
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const schedulesData = await getSchedules({
          page: 0,
          category: selectedCategory,
          searchWords: '',
        });

        console.log('저장 일정 응답:', schedulesData);

        setSchedules(schedulesData.result?.list ?? []);
      } catch (error) {
        console.error('저장 일정 조회 실패:', error);
      }
    };

    fetchSchedules();
  }, [selectedCategory]);
  // ========================================
  // 기억해야 할 정보 - 임박 일정 알림 조회
  // ========================================
  useEffect(() => {
    const fetchImminentAlarms = async () => {
      try {
        const settingsData = await getAlarmSettings();
        console.log('내 알림 설정:', settingsData);

        const alarmsData = await getAlarms(0, 'IMMINENT');
        console.log('IMMINENT 응답:', alarmsData);

        const alarms = alarmsData.result?.notifications ?? [];

        setAlarmCount(alarmsData.result?.alarmCount ?? 0);

        setLatestAlarm(alarms.find((alarmItem) => !alarmItem.isOpened) ?? null);

        setMemoryItems(
          alarms.map((alarmItem) => ({
            id: alarmItem.scheduleId,
            title: alarmItem.title,
            dday: alarmItem.Dday,
          })),
        );
      } catch (error) {
        console.error('IMMINENT 알림 조회 실패:', error);
      }
    };

    fetchImminentAlarms();
  }, []);

  const handleTestPush = async () => {
    try {
      const res = await api.post('/alarm/test-push');
      console.log('푸시 테스트 성공:', res.data);
    } catch (error) {
      console.error('푸시 테스트 실패:', error);
    }
  };

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
          {memoryItems.length === 0 ? (
            <S.PreviewTitle style={{ textAlign: 'center' }}>아직 임박한 일정은 없어요.</S.PreviewTitle>
          ) : (
            memoryItems.map((memory) => (
              <S.MemoryItem key={`${memory.id}-${memory.title}`} onClick={() => navigate(`/detail/${memory.id}`)}>
                <span>{memory.title}</span>

                <S.MemoryRight>
                  <S.Dday $active={memory.dday <= 1}>{memory.dday === 0 ? 'D-DAY' : `D-${memory.dday}`}</S.Dday>

                  <S.ArrowButton type="button">›</S.ArrowButton>
                </S.MemoryRight>
              </S.MemoryItem>
            ))
          )}
        </S.MemoryList>
      </S.MemoryBox>

      <S.SearchSection>
        <SearchBar onClick={() => navigate('/archive')} />
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
              key={`${item.isGroup ? 'group' : 'schedule'}-${item.id}`}
              id={item.id}
              image={item.captureImg}
              title={item.title}
              isGroup={item.isGroup}
              isNew={item.isNew}
              elementCount={item.elementCount}
            />
          ))}
        </S.PreviewList>
      </S.PreviewSection>
      <button onClick={handleTestPush} style={{ marginTop: '10px' }}>
        알림 테스트
      </button>
    </S.HomeContainer>
  );
}

export default Home;
