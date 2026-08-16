import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './styles/AppLayout';
import Intro from './pages/Intro';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CheckPhotoAuth from './pages/CheckPhotoAuth';
import CheckNotiAuth from './pages/CheckNotiAuth';
import Mypage from './pages/Mypage';
import ProfileEdit from './pages/ProfileEdit';
import NotiSetting from './pages/NotiSetting';
import Notification from './pages/Notification';
import Upload from './pages/Upload';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/check-photo-auth" element={<CheckPhotoAuth />} />
        <Route path="/check-noti-auth" element={<CheckNotiAuth />} />

        {/* 하단바 필요한 페이지들 */}
        <Route element={<AppLayout />}>
          <Route path="/notification" element={<Notification />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/mypage/edit" element={<ProfileEdit />} />
          <Route path="/mypage/notifications" element={<NotiSetting />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
