import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './styles/AppLayout';
import Intro from './pages/Intro';
import Home from './pages/Home';
import Archive from './pages/Archive';
import Group from './pages/Group';
import Detail from './pages/Detail';

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/Archive' element={<Archive />} />
          <Route path='/Group' element={<Group />} />
          <Route path='/Detail' element={<Detail />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
