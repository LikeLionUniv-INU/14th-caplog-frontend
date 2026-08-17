import back from '../assets/back.svg';
import modifyicon from '../assets/modify.svg';
import deleteicon from '../assets/delete.svg';
import * as S from './Group.style';
import testday from '../assets/testday.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Group() {
  const navigate = useNavigate();

  const [openPopup, setOpenPopup] = useState(null);

  return (
    <S.GroupContainer>
      <S.GroupHeader>
        <S.BackButton type="button" onClick={() => navigate('/Home')}>
          <img src={back} alt="뒤로가기" />
        </S.BackButton>
      </S.GroupHeader>

      <S.GroupInfoBox>
        <S.InfoTop>
          <S.Category>공부</S.Category>

          <S.ActionButtons>
            <S.IconButton type="button" onClick={() => setOpenPopup('modify')}>
              <img src={modifyicon} alt="수정" />
            </S.IconButton>

            <S.IconButton type="button" onClick={() => setOpenPopup('delete')}>
              <img src={deleteicon} alt="삭제" />
            </S.IconButton>
          </S.ActionButtons>
        </S.InfoTop>

        <S.GroupTitle>데이터수학통계 과목</S.GroupTitle>
        <S.GroupCount>3개의 정보가 저장됨</S.GroupCount>
      </S.GroupInfoBox>

      <S.CardList>
        <S.Card onClick={() => navigate('/detail/${id}')}>
          <S.CardTitle>데이터수학통계 중간고사 날짜</S.CardTitle>
          <S.CardImage src={testday} alt="사진" />
        </S.Card>

        <S.Card>
          <S.CardTitle>데이터수학통계 강의 휴강</S.CardTitle>
          <S.CardImage alt="사진" />
        </S.Card>

        <S.Card>
          <S.CardTitle>통계학 기말고사 문제 풀이</S.CardTitle>
          <S.CardImage alt="사진" />
        </S.Card>
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

              <S.DeleteButton onClick={() => setOpenPopup(null)}>
                삭제
              </S.DeleteButton>
            </S.DeleteButtonBox>
          </S.DeletePopup>
        </S.DeleteOverlay>
      )}
    </S.GroupContainer>
  );
}

export default Group;
