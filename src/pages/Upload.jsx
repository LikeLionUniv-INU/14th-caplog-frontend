import { useRef, useState } from 'react';
import * as S from './Upload.styles';
import GalleryIcon from '../assets/icons/Gallery.svg';
import { analyzeImage } from '../api/upload';
import { useNavigate } from 'react-router-dom';
import UploadLoading from '../components/common/UploadLoading';
import BottomSheet from '../components/common/BottomSheet';

export default function Upload() {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);

    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);
  };

  /** 사진 업로드 api 함수 */
  const handleSubmit = async () => {
    if (!imageFile) {
      alert('사진을 먼저 선택해주세요.');
      return;
    }
    setIsLoading(true);

    try {
      // 서버 연동 전 테스트용
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setIsSheetOpen(true);

      // const data = await analyzeImage(imageFile);
      // if (data.isSuccess) {
      //   setIsSheetOpen(true);
      // } else {
      //   alert(data.message || '분석 중 오류가 발생했습니다.');
      // }
    } catch (error) {
      console.error('업로드 실패:', error);
      alert('서버와 통신할 수 없습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.Container>
      <S.Header>사진 등록</S.Header>

      <S.UploadBox onClick={handleBoxClick}>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        {previewImage ? (
          <S.PreviewImg src={previewImage} />
        ) : (
          <img src={GalleryIcon} width="64" />
        )}

        <S.Description style={{ margin: '20px 0 0 0' }}>
          터치하여 사진 추가
        </S.Description>
      </S.UploadBox>

      <S.Description>
        기기에 저장된 스크린샷을 선택하세요.
        <br />
        선택한 항목은 CapLog에 저장되어 AI 분석 대상이 됩니다.
        <br />
        <br />
        등록 후 AI가 제목, 핵심 내용, 일정을 추출합니다.
      </S.Description>

      <S.SubmitButton onClick={handleSubmit} disabled={!imageFile || isLoading}>
        {isLoading ? 'AI가 분석하고 있어요...' : '사진 분석하기'}
      </S.SubmitButton>

      {isLoading && <UploadLoading />}

      <BottomSheet isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)} />
    </S.Container>
  );
}
