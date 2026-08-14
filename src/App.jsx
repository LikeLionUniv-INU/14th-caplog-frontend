import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './styles/AppLayout';
import Intro from './pages/Intro';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CheckAuth from './pages/CheckAuth';
import Mypage from './pages/Mypage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/checkauth" element={<CheckAuth />} />

        {/* 하단바 필요한 페이지들 */}
        <Route element={<AppLayout />}>
          <Route path="/mypage" element={<Mypage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
