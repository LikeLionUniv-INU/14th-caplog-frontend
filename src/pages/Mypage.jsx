import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getUserInfo } from '../api/user';
import avatarImg from '../assets/images/Avatar.png';

export default function Mypage() {
  const [userName, setUserName] = useState('게스트');

  /** 유저 정보 조회 API 함수*/
  const fetchUserInfo = async () => {
    try {
      const data = await getUserInfo();
      const name = data.result?.userName || '게스트';
      setUserName(name);
    } catch (error) {
      console.error('유저 정보 조회 오류:', error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <Container>
      <Header>마이페이지</Header>
      <InfoCard>
        <Avatar src={avatarImg} />
        <ProfileText>{userName} 님 반갑습니다.</ProfileText>
      </InfoCard>
    </Container>
  );
}

// ======================디자인==========================
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100dvh;
  background-color: #ffffff;
  box-sizing: border-box;
`;

const Header = styled.div`
  width: 90%;
  box-sizing: border-box;
  padding: 24px;
  margin-top: 24px;
  color: #7c2d12;
  font-size: 16px;
  font-weight: 800;
  text-align: left;
`;

const InfoCard = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  height: 110px;
  box-sizing: border-box;
  background-color: #ffd1a1;
  border-radius: 16px;
  padding: 24px;
`;

const Avatar = styled.img`
  width: 18%;
  border-radius: 50%;
  border: 1px solid #fff0dd;
  object-fit: cover;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ProfileText = styled.div`
  margin-left: 16px;
  color: #7c2d12;
  font-size: 14px;
  font-weight: 700;
`;
