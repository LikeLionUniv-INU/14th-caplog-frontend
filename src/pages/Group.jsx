import back from '../assets/back.svg';
import modifyicon from '../assets/modify.svg';
import deleteicon from '../assets/delete.svg';
import * as S from './Group.style';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getGroupDetail, deleteGroup } from '../api/groupApi';

function Group() {
  const navigate = useNavigate();
  const { groupId } = useParams();

  const [openPopup, setOpenPopup] = useState(null);
  const [groupData, setGroupData] = useState(null);

  useEffect(() => {
    const fetchGroupDetail = async () => {
      const result = await getGroupDetail(groupId, 0);
      setGroupData(result);
    };

    fetchGroupDetail();
  }, [groupId]);

  // 그룹 삭제 버튼을 눌렀을 때 실행되는 함수
  const handleDeleteGroup = async () => {
    try {
      const result = await deleteGroup(groupId);

      // 삭제 API 요청이 성공한 경우
      if (result.isSuccess) {
        setOpenPopup(null);

        navigate('/Home');
      }
    } catch (error) {
      // 서버 오류나 네트워크 오류가 발생한 경우 확인용
      console.error('그룹 삭제 실패:', error);
    }
  };

  if (!groupData) {
    return <div>로딩 중...</div>;
  }

  return (
    <S.GroupContainer>
      <S.GroupHeader>
        <S.BackButton type="button" onClick={() => navigate('/Home')}>
          <img src={back} alt="뒤로가기" />
        </S.BackButton>
      </S.GroupHeader>

      <S.GroupInfoBox>
        <S.InfoTop>
          <S.Category>{groupData.result.group.groupCategory}</S.Category>

          <S.ActionButtons>
            <S.IconButton type="button" onClick={() => setOpenPopup('modify')}>
              <img src={modifyicon} alt="수정" />
            </S.IconButton>

            <S.IconButton type="button" onClick={() => setOpenPopup('delete')}>
              <img src={deleteicon} alt="삭제" />
            </S.IconButton>
          </S.ActionButtons>
        </S.InfoTop>

        <S.GroupTitle>{groupData.result.group.groupName}</S.GroupTitle>
        <S.GroupCount>
          {groupData.result.scheduleCount}개의 정보가 저장됨
        </S.GroupCount>
      </S.GroupInfoBox>

      <S.CardList>
        {groupData.result.schedules.map((schedule) => (
          <S.Card
            key={schedule.scheduleId}
            onClick={() => navigate(`/detail/${schedule.scheduleId}`)}
          >
            {schedule.isNew && <S.NewBadge>NEW</S.NewBadge>}

            <S.CardTitle>{schedule.title}</S.CardTitle>
            <S.CardImage src={schedule.imgUrl} alt="사진" />
          </S.Card>
        ))}
      </S.CardList>

      {openPopup === 'modify' && (
        <S.ModalOverlay>
          <S.ModifyPopup>
            <S.ModifyHeader>
              <h2>수정하기</h2>
            </S.ModifyHeader>

            <S.InputBox>
              <p>제목</p>
              <input defaultValue="데이터수학통계 과목" />
            </S.InputBox>

            <S.InputBox>
              <p>카테고리</p>

              <select defaultValue="공부">
                <option>공부</option>
                <option>학교</option>
                <option>일상</option>
                <option>기타</option>
              </select>
            </S.InputBox>

            <S.Divider />

            <S.ButtonBox>
              <S.CancelButton onClick={() => setOpenPopup(null)}>
                취소
              </S.CancelButton>

              <S.ModifyButton onClick={() => setOpenPopup(null)}>
                수정
              </S.ModifyButton>
            </S.ButtonBox>
          </S.ModifyPopup>
        </S.ModalOverlay>
      )}

      {openPopup === 'delete' && (
        <S.DeleteOverlay>
          <S.DeletePopup>
            <S.DeleteTitle>정말 삭제하시겠습니까?</S.DeleteTitle>

            <S.DeleteText>
              카테고리 삭제 시 저장된 모든 정보가 삭제됩니다.
              <br />
              삭제한 항목은 복구할 수 없습니다.
            </S.DeleteText>

            <S.DeleteButtonBox>
              <S.CancelButton onClick={() => setOpenPopup(null)}>
                취소
              </S.CancelButton>

              <S.DeleteButton onClick={handleDeleteGroup}>삭제</S.DeleteButton>
            </S.DeleteButtonBox>
          </S.DeletePopup>
        </S.DeleteOverlay>
      )}
    </S.GroupContainer>
  );
}

export default Group;
