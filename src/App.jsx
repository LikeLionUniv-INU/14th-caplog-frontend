import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/common/PageTransition';
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

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Intro /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/signup" element={<PageTransition><Signup /></PageTransition>} />
        <Route path="/check-photo-auth" element={<PageTransition><CheckPhotoAuth /></PageTransition>} />
        <Route path="/check-noti-auth" element={<PageTransition><CheckNotiAuth /></PageTransition>} />

        {/* 하단바 필요한 페이지들 */}
        <Route element={<AppLayout />}>
          <Route path="/notification" element={<PageTransition><Notification /></PageTransition>} />
          <Route path="/upload" element={<PageTransition><Upload /></PageTransition>} />
          <Route path="/mypage" element={<PageTransition><Mypage /></PageTransition>} />
          <Route path="/mypage/edit" element={<PageTransition><ProfileEdit /></PageTransition>} />
          <Route path="/mypage/notifications" element={<PageTransition><NotiSetting /></PageTransition>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div style={{ position: 'relative', width: '100%', height: '100dvh', overflow: 'hidden' }}>
        <AnimatedRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
