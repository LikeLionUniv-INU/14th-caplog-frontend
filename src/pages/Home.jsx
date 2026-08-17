import PreviewBox from './PreviewBox';
import PreviewFilter from './PreviewFilter';
import SearchBar from './SearchBar';
import * as S from './Home.style';
import logo from '../assets/logo.svg';
import alarm from '../assets/alarm.svg';
import { memoryData } from './mockMemory';
import { previewData } from './mockPreview';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <S.HomeContainer>
      <S.Header>
        <S.Logo src={logo} alt="Caplog" />

        <S.AlarmButton onClick={() => navigate('/notification')}>
          <img src={alarm} alt="알람" />
        </S.AlarmButton>
      </S.Header>

      <S.MemoryBox>
        <S.MemoryTitle>기억해야 할 정보가 있어요!</S.MemoryTitle>

        <S.MemoryList>
          {memoryData.map((memory) => (
            <S.MemoryItem key={memory.id}>
              <span>{memory.title}</span>

              <S.MemoryRight>
                <S.Dday $active={memory.active}>{memory.dday}</S.Dday>

                <S.ArrowButton>›</S.ArrowButton>
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
          <S.PreviewTitle>저장한 캡쳐 정보</S.PreviewTitle>

          <S.AllButton onClick={() => navigate('/Archive')}>
            전체 보기 ›
          </S.AllButton>
        </S.PreviewHeader>

        <S.FilterSection>
          <PreviewFilter />
        </S.FilterSection>

        <S.PreviewList>
          {previewData.map((preview) => (
            <PreviewBox
              key={preview.id}
              image={preview.image}
              title={preview.title}
            />
          ))}
        </S.PreviewList>
      </S.PreviewSection>
    </S.HomeContainer>
  );
}

export default Home;
