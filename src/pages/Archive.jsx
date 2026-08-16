import PreviewBox from './PreviewBox';
import PreviewFilter from './PreviewFilter';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';
import { previewData } from './mockPreview';
import * as S from './Archive.style';
import back from '../assets/back.svg';

function Archive() {
  const navigate = useNavigate();

  return (
    <S.ArchiveContainer>
      <S.ArchiveHeader>
        <S.BackButton onClick={() => navigate('/Home')}>
          <img src={back} alt="뒤로가기" />
        </S.BackButton>

        <S.Title>저장한 정보</S.Title>
      </S.ArchiveHeader>

      <S.SearchArea>
        <SearchBar />
      </S.SearchArea>

      <S.FilterArea>
        <PreviewFilter />
      </S.FilterArea>

      <S.PreviewList>
        {previewData.map((preview) => (
          <PreviewBox
            key={preview.id}
            image={preview.image}
            title={preview.title}
          />
        ))}
      </S.PreviewList>
    </S.ArchiveContainer>
  );
}

export default Archive;
