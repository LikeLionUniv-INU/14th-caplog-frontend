import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LeftArrowIcon from '../assets/icons/LeftArrow.svg';

export default function NotiSetting() {
  const navigate = useNavigate();

  const [toggles, setToggles] = useState({
    all: true,
    schedule: true,
    unread: true,
    recommend: true,
  });

  const notiItems = [
    { id: 'all', label: '전체 알림', desc: '모든 알림을 받아요.' },
    {
      id: 'schedule',
      label: '일정 알림',
      desc: '모든 저장된 일정의 마감 임박 알림을 받아요.',
    },
    {
      id: 'unread',
      label: '미열람 알림',
      desc: '아직 확인하지 않은 정보 알림을 받아요.',
    },
    {
      id: 'recommend',
      label: '추천 알림',
      desc: 'AI가 추천하는 행동 알림을 받아요.',
    },
  ];

  const handleToggle = (id) => {
    setToggles((prev) => {
      if (id === 'all') {
        const nextState = !prev.all;
        return {
          all: nextState,
          schedule: nextState,
          unread: nextState,
          recommend: nextState,
        };
      } else {
        const nextState = { ...prev, [id]: !prev[id] };
        if (!nextState[id]) nextState.all = false;
        if (nextState.schedule && nextState.unread && nextState.recommend) nextState.all = true;

        return nextState;
      }
    });
  };

  return (
    <Container>
      <Header>
        <BackIcon src={LeftArrowIcon} onClick={() => navigate('/mypage')} />
        <HeaderTitle>알림 설정</HeaderTitle>
      </Header>
      <Desc>원하는 알림을 선택하여 CapLog의 알림을 받아보세요.</Desc>

      <MenuContainer>
        <MenuBox>
          {notiItems.map((item) => (
            <MenuItem key={item.id}>
              <TextWrapper>
                <MenuLabel>{item.label}</MenuLabel>
                <MenuDesc>{item.desc}</MenuDesc>
              </TextWrapper>

              <ToggleWrapper $isOn={toggles[item.id]} onClick={() => handleToggle(item.id)}>
                <ToggleCircle $isOn={toggles[item.id]} />
              </ToggleWrapper>
            </MenuItem>
          ))}
        </MenuBox>
      </MenuContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100dvh;
  background-color: #ffffff;
  box-sizing: border-box;
  overflow-y: auto;
  padding-bottom: 100px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  width: 85%;
  text-align: left;
  padding: 20px 0 0 0;
  margin-top: 10px;
`;

const BackIcon = styled.img`
  width: 10px;
  margin-right: 14px;
  cursor: pointer;
`;

const HeaderTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
  color: #7c2d12;
`;

const Desc = styled.p`
  margin: 0 0 40px 0;
  font-size: 12px;
  color: #b55116;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 24px;
  box-sizing: border-box;
`;

const MenuBox = styled.div`
  background-color: #ffffff;
  border: 1px solid #fdba74;
  border-radius: 8px;
  overflow: hidden;
`;

const MenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;
  background-color: #ffffff;
  transition: background-color 0.2s;

  &:not(:last-child) {
    border-bottom: 1px solid #fdba74;
  }

  &:active {
    background-color: #f3f4f6;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-right: 16px;
`;

const MenuLabel = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: #7c2d12;
`;

const MenuDesc = styled.span`
  font-size: 11px;
  font-weight: 400;
  color: #b55116;
  line-height: 1.4;
`;

const ToggleWrapper = styled.div`
  width: 46px;
  height: 22px;
  border-radius: 14px;
  background-color: ${({ $isOn }) => ($isOn ? '#B55116' : '#D1D5DB')};
  position: relative;
  cursor: pointer;
  flex-shrink: 0;

  transition: background-color 0.3s ease-in-out;
`;

const ToggleCircle = styled.div`
  width: 18px;
  height: 18px;
  background-color: #ffffff;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: ${({ $isOn }) => ($isOn ? '25px' : '3px')};
  transition: left 0.3s ease-in-out;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;
