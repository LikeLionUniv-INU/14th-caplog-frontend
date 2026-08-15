import * as S from './Login.styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, checkPhotoAuth, checkNotiAuth } from '../api/auth';

export default function Login() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  /** 로그인 API 연동 함수 */
  const handleLoginSubmit = async () => {
    if (!nickname || !password) {
      setErrorMessage('닉네임과 비밀번호를 모두 입력해주세요.');
      return;
    }
    setErrorMessage('');

    try {
      const data = await login(nickname, password);

      if (data.isSuccess) {
        // 토큰 저장
        const token = data.result?.accessToken;
        if (token) localStorage.setItem('accessToken', token);

        const userNickname = data.result?.nickname || '게스트';

        try {
          const photoAuthData = await checkPhotoAuth();
          const notiAuthData = await checkNotiAuth();
          const isPhotoApproved = photoAuthData.result?.isApproved;
          const isNotiApproved = notiAuthData.result?.isApproved;

          if (isPhotoApproved && isNotiApproved) {
            alert(`${userNickname}님 환영합니다.`);
            navigate('/home');
          } else {
            navigate('/check-photo-auth');
          }
        } catch (authError) {
          console.error('권한 확인 실패:', authError);
          navigate('/check-photo-auth');
        }
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        '서버와 통신할 수 없습니다. 다시 시도해주세요.';
      setErrorMessage(errorMsg);
    }
  };

  return (
    <S.Container>
      <h1 style={{ color: '#7C2D12' }}>로그인</h1>
      <S.InputWrapper>
        <S.Label>닉네임</S.Label>
        <S.Input
          style={{ marginBottom: '30px' }}
          type="text"
          placeholder="닉네임을 입력해주세요."
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />

        <S.Label>비밀번호</S.Label>
        <S.Input
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </S.InputWrapper>

      <S.ErrorMessage>{errorMessage}</S.ErrorMessage>

      <S.LoginButton onClick={handleLoginSubmit}>로그인</S.LoginButton>

      <S.Divider />

      <S.SignupWrapper>
        계정이 없으신가요?
        <S.SignupText onClick={handleSignUpClick}>회원가입</S.SignupText>
      </S.SignupWrapper>
    </S.Container>
  );
}
