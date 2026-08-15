import * as S from "./Detail.style";
import back from "../assets/back.svg";
import modifyicon from "../assets/modify.svg";
import deleteicon from "../assets/delete.svg";
import { useNavigate } from "react-router-dom";

function Detail() {
  const navigate = useNavigate();

  return (
    <S.DetailContainer>
      <S.ImageSection>
        <S.Header>
          <S.BackButton onClick={() => navigate("/group")}>
            <img src={back} alt="뒤로가기" />
          </S.BackButton>
        </S.Header>

        <S.ImageButton>
          <img alt="사진" />
        </S.ImageButton>
      </S.ImageSection>

      <S.InfoSection>
        <S.TitleRow>
          <S.Title>데이터수학통계 중간고사 날짜</S.Title>
          <S.Dday>D-13</S.Dday>
        </S.TitleRow>

        <S.Divider />

        <S.SummaryHeader>
          <S.SummaryTitle>CapLog AI 분석 요약</S.SummaryTitle>

          <S.ButtonGroup>
            <S.IconButton>
              <img src={modifyicon} alt="수정" />
            </S.IconButton>

            <S.IconButton>
              <img src={deleteicon} alt="삭제" />
            </S.IconButton>
          </S.ButtonGroup>
        </S.SummaryHeader>

        <S.SummaryBox>
          <p>
            데이터수학통계 중간고사는 4월 22일 오후 3시에 5호관 301호에서
            진행됩니다.
          </p>

          <p>
            계산기와 종이 자료를 사용할 수 있으며, 시험에 필요한 분포표는
            제공됩니다.
          </p>
        </S.SummaryBox>
      </S.InfoSection>
    </S.DetailContainer>
  );
}

export default Detail;