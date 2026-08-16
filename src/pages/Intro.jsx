import { useNavigate } from 'react-router-dom';

export default function Intro() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>(인트로 페이지)</h1>
      <h1>현재 UI 완성된 페이지들입니다 - UI/UX 피드백 ㄱㄱ</h1>
      <button onClick={() => navigate('/login')}>로그인 페이지</button> <br />
      <button onClick={() => navigate('/signup')}>회원가입 페이지</button> <br />
      <button onClick={() => navigate('/check-photo-auth')}>사진 권한 페이지</button> <br />
      <button onClick={() => navigate('/check-noti-auth')}>알림 권한 페이지</button> <br />
      <button onClick={() => navigate('/notification')}>알림 페이지</button> <br />
      <button onClick={() => navigate('/upload')}>수동 업로드 페이지</button> <br />
      <button onClick={() => navigate('/mypage')}>마이페이지</button> <br />
    </div>
  );
}
