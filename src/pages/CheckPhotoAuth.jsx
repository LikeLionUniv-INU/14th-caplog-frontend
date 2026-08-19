import * as S from './CheckAuth.styles';
import { useNavigate } from 'react-router-dom';
import { putPhotoAuth } from '../api/auth';
import { Camera } from '@capacitor/camera';
import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';

export default function CheckPhotoAuth() {
  const navigate = useNavigate();

  /** 사진/갤러리 권한 요청 핸들러 */
  const handlePhotoAuth = async () => {
    // 웹인 경우
    if (!Capacitor.isNativePlatform()) {
      navigate('/check-noti-auth');
    }

    try {
      const permissions = await Camera.requestPermissions();

      if (permissions.photos === 'granted') {
        navigate('/check-noti-auth');
      } else {
        alert('사진 권한이 거부되었습니다. 원활한 앱 사용을 위해 권한을 허용해주세요.');
      }
    } catch (error) {
      console.error('사진 권한 요청 중 에러 발생:', error);
    }
  };

  return (
    <S.Container>
      <h2 style={{ color: '#7C2D12', margin: '0' }}>사진 권한 안내</h2>

      <S.ContentWrapper>
        <S.SectionTitle>사진 접근 권한</S.SectionTitle>
        <S.Description>
          CapLog는 기기 사진에서 스크린샷을 선택해
          <br />
          정리 정보를 자동으로 추출합니다.
        </S.Description>

        <S.InfoCard>
          <S.SectionTitle>접근 범위</S.SectionTitle>
          <S.Description style={{ fontSize: '12px' }}>
            • 스크린샷 또는 갤러리의 사진 등록 가능 <br />
            • 선택하지 않은 다른 사진은 접근하지 않음
            <br />• 저장된 이미지는 로컬 기기에만 보관
          </S.Description>
        </S.InfoCard>

        <S.InfoCard>
          <S.SectionTitle>보호되는 정보</S.SectionTitle>
          <S.Description style={{ fontSize: '12px' }}>
            • 저장된 정보는 CapLog 기능 외에 다른 목적으로 사용되지 않음 <br />
            • AI 분석 중 이미지는 외부 전송되지 않음
            <br />• 삭제한 정보는 완전히 제거됨
          </S.Description>
        </S.InfoCard>

        <S.Description style={{ fontSize: '12px', fontWeight: '300', textAlign: 'center' }}>
          이 설정은 언제든 기기 설정에서 변경할 수 있습니다.
        </S.Description>
      </S.ContentWrapper>

      <S.StartButton onClick={handlePhotoAuth}>사진 권한 허용하기</S.StartButton>
    </S.Container>
  );
}
