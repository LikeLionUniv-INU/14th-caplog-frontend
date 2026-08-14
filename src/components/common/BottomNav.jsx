import * as S from './BottomNav.styles';
import { useNavigate, useLocation } from 'react-router-dom';
import HomeIcon from '../../assets/icons/Home.svg';
import CalendarIcon from '../../assets/icons/Calendar.svg';
import UploadIcon from '../../assets/icons/Upload.svg';
import ProfileIcon from '../../assets/icons/Profile.svg';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/home', icon: <img src={HomeIcon} /> },
    { path: '/calendar', icon: <img src={CalendarIcon} /> },
    { path: '/upload', icon: <img src={UploadIcon} /> },
    { path: '/mypage', icon: <img src={ProfileIcon} /> },
  ];

  return (
    <S.NavContainer>
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;

        return (
          <S.NavItem
            key={item.path}
            $isActive={isActive}
            onClick={() => navigate(item.path)}
          >
            {/* SVG 아이콘 컴포넌트가 들어갈 자리 */}
            <span style={{ fontSize: '10px' }}>{item.icon}</span>
          </S.NavItem>
        );
      })}
    </S.NavContainer>
  );
}
