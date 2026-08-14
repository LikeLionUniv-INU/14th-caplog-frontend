import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './styles/AppLayout';
import Intro from './pages/Intro';
import Home from './pages/Home';
import Archive from './pages/Archive';

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/Archive' element={<Archive />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
