import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './styles/AppLayout';
import Intro from './pages/Intro';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CheckAuth from './pages/CheckAuth';

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/checkauth" element={<CheckAuth />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
