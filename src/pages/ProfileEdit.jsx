import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './ProfileEdit.styles';
import LeftArrowIcon from '../assets/icons/LeftArrow.svg';
import Avatar1 from '../assets/images/Avatar_1.png';
import Avatar2 from '../assets/images/Avatar_2.png';
import Avatar3 from '../assets/images/Avatar_3.png';

const AVATAR_LIST = [
  { id: 1, src: Avatar1 },
  { id: 2, src: Avatar2 },
  { id: 3, src: Avatar3 },
];

export default function ProfileEdit() {
  const navigate = useNavigate();
  const [selectedAvatar, setSelectedAvatar] = useState(1);
  const [nickname, setNickname] = useState('LikeLionINU');

  const handleNicknameChange = (e) => {
    const value = e.target.value;
    if (value.length <= 20) {
      setNickname(value);
    }
  };

  const handleClearNickname = () => {
    setNickname('');
  };

  const handleSave = () => {
    if (nickname.trim() === '') {
      alert('닉네임을 입력해주세요!');
      return;
    }
    console.log('저장된 데이터:', { avatarId: selectedAvatar, nickname });
    alert('프로필이 수정되었습니다.');
    navigate('/mypage');
  };

  return (
    <S.Container>
      <S.Header>
        <S.BackIcon src={LeftArrowIcon} onClick={() => navigate('/mypage')} />
        <S.HeaderTitle>프로필 설정</S.HeaderTitle>
      </S.Header>

      <S.Section>
        <S.SectionTitle>프로필 사진</S.SectionTitle>
        <S.SectionDesc>기본 이미지 중 하나를 선택할 수 있어요.</S.SectionDesc>

        <S.AvatarBox>
          {AVATAR_LIST.map((avatar) => (
            <S.AvatarWrapper
              key={avatar.id}
              onClick={() => setSelectedAvatar(avatar.id)}
            >
              <S.AvatarImg src={avatar.src} alt={`아바타 ${avatar.id}`} />
              {selectedAvatar === avatar.id ? (
                <S.CheckBadge $isActive={true}>✓</S.CheckBadge>
              ) : (
                <S.CheckBadge $isActive={false} />
              )}
            </S.AvatarWrapper>
          ))}
        </S.AvatarBox>
      </S.Section>

      <S.Section>
        <S.SectionTitle>닉네임</S.SectionTitle>
        <S.SectionDesc>닉네임은 언제든지 변경할 수 있어요.</S.SectionDesc>

        <S.NicknameBox>
          <S.InputLabel>닉네임</S.InputLabel>
          <S.InputWrapper>
            <S.Input
              value={nickname}
              onChange={handleNicknameChange}
              placeholder="닉네임을 입력하세요"
            />
            {nickname.length > 0 && (
              <S.ClearButton onClick={handleClearNickname}>×</S.ClearButton>
            )}
          </S.InputWrapper>
          <S.CharCount>{nickname.length} / 20</S.CharCount>
        </S.NicknameBox>
      </S.Section>

      <S.SaveButton onClick={handleSave}>저장하기</S.SaveButton>
    </S.Container>
  );
}
