import back from "../assets/back.svg";
import modifyicon from "../assets/modify.svg";
import deleteicon from "../assets/delete.svg";
import * as S from "./Group.style";
import { useNavigate } from "react-router-dom";

function Group() {
  const navigate = useNavigate();

  return (
    <S.GroupContainer>
      <S.GroupHeader>
        <S.BackButton type="button">
          <img src={back} alt="뒤로가기" />
        </S.BackButton>
      </S.GroupHeader>

      <S.GroupInfoBox>
        <S.InfoTop>
          <S.Category>공부</S.Category>

          <S.ActionButtons>
            <S.IconButton type="button">
              <img src={modifyicon} alt="수정" />
            </S.IconButton>

            <S.IconButton type="button">
              <img src={deleteicon} alt="삭제" />
            </S.IconButton>
          </S.ActionButtons>
        </S.InfoTop>

        <S.GroupTitle>데이터수학통계 과목</S.GroupTitle>
        <S.GroupCount>3개의 정보가 저장됨</S.GroupCount>
      </S.GroupInfoBox>

      <S.CardList>
        <S.Card onClick={() => navigate("/detail")}>
          <S.CardTitle>데이터수학통계 중간고사 날짜</S.CardTitle>
          <S.CardImage alt="사진" />
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
    </S.GroupContainer>
  );
}

export default Group;