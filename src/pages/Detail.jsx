import * as S from './Detail.style';
import back from '../assets/back.svg';
import modifyicon from '../assets/modify.svg';
import deleteicon from '../assets/delete.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getScheduleDetail, deleteSchedule } from '../api/scheduleDetailApi';

function Detail() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [openPopup, setOpenPopup] = useState(null);

  const [detail, setDetail] = useState(null);

  // 일정 사용 여부
  const [scheduleEnabled, setScheduleEnabled] = useState(true);

  // 날짜 / 시간
  const [schedule, setSchedule] = useState('');

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await getScheduleDetail(id);

        setDetail(data.result);

        setSchedule(data.result.events[0].dateTime);

        setScheduleEnabled(data.result.events[0].hasDate);
      } catch (error) {
        console.error('상세 정보 조회 실패:', error);
      }
    };

    fetchDetail();
  }, [id]);

  const event = detail?.events?.[0];

  if (!detail || !event) {
    return null;
  }

  // 디데이 계산
  const getDday = (dateTime) => {
    if (!dateTime) return null;

    const today = new Date();
    const targetDate = new Date(dateTime);

    today.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);

    const diffTime = targetDate - today;
    const diffDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDay === 0) return 'D-Day';
    if (diffDay > 0) return `D-${diffDay}`;

    return `D+${Math.abs(diffDay)}`;
  };

  // 일정 삭제 팝업 버튼 함수
  const handleDeleteSchedule = async () => {
    try {
      const result = await deleteSchedule(id);

      if (result.isSuccess) {
        setOpenPopup(null);

        navigate('/home');
      }
    } catch (error) {
      // 서버 오류나 네트워크 오류가 발생한 경우 확인용
      console.error('이미지 삭제에 실패했습니다:', error);
    }
  };

  return (
    <S.DetailContainer>
      {/* 사진 영역 */}
      <S.ImageSection>
        <S.Header>
          <S.BackButton type="button" onClick={() => navigate(`/group/${id}`)}>
            <img src={back} alt="뒤로가기" />
          </S.BackButton>
        </S.Header>

        <S.ImageButton type="button" onClick={() => setOpenPopup('fullScreen')}>
          <img src={detail.imgUrl?.[0]} alt="사진" />
        </S.ImageButton>
      </S.ImageSection>

      {/* 정보 영역 */}
      <S.InfoSection>
        <S.TitleRow>
          <S.Title>{event.title}</S.Title>
          <S.Dday>{getDday(event.dateTime)}</S.Dday>
        </S.TitleRow>

        <S.Divider />

        <S.SummaryHeader>
          <S.SummaryTitle>CapLog AI 분석 요약</S.SummaryTitle>

          <S.ButtonGroup>
            <S.IconButton type="button" onClick={() => setOpenPopup('modify')}>
              <img src={modifyicon} alt="수정" />
            </S.IconButton>

            <S.IconButton type="button" onClick={() => setOpenPopup('delete')}>
              <img src={deleteicon} alt="삭제" />
            </S.IconButton>
          </S.ButtonGroup>
        </S.SummaryHeader>

        <S.SummaryBox>
          <p>{event.aiSummary}</p>
        </S.SummaryBox>
      </S.InfoSection>

      {/* 사진 전체보기 팝업 */}
      {openPopup === 'fullScreen' && (
        <S.FullScreenOverlay>
          <S.FullScreenHeader>
            <S.BackButton type="button" onClick={() => setOpenPopup(null)}>
              <img src={back} alt="뒤로가기" />
            </S.BackButton>
          </S.FullScreenHeader>

          <S.FullScreenImageBox>
            <S.FullScreenImage src={detail.imgUrl?.[0]} alt="사진" />
          </S.FullScreenImageBox>
        </S.FullScreenOverlay>
      )}

      {/* 수정 팝업 */}
      {openPopup === 'modify' && (
        <S.PopupOverlay>
          <S.ModifyPopup>
            <S.PopupTitle>수정하기</S.PopupTitle>

            {/* 제목 */}
            <S.FormGroup>
              <S.Label>제목</S.Label>

              <S.TextInput defaultValue={event.title} />
            </S.FormGroup>

            {/* 일정 */}
            <S.FormGroup>
              <S.Label>일정</S.Label>

              <S.ScheduleRow>
                <S.CheckBox
                  type="checkbox"
                  checked={scheduleEnabled}
                  onChange={(e) => setScheduleEnabled(e.target.checked)}
                />

                <S.DateTimeInput
                  type="datetime-local"
                  value={schedule}
                  disabled={!scheduleEnabled}
                  onChange={(e) => setSchedule(e.target.value)}
                />
              </S.ScheduleRow>
            </S.FormGroup>

            {/* 세부사항 */}
            <S.FormGroup>
              <S.Label>세부사항</S.Label>

              <S.TextArea defaultValue={event.details} />
            </S.FormGroup>

            {/* AI 요약 */}
            <S.FormGroup>
              <S.Label>AI 요약</S.Label>

              <S.TextArea defaultValue={event.aiSummary} />
            </S.FormGroup>

            {/* 저장 위치 */}
            <S.SaveSection>
              <S.SaveTitle>저장 위치</S.SaveTitle>

              <S.SelectRow>
                <S.SelectBox>
                  <S.Label>카테고리</S.Label>

                  <S.Select defaultValue="공부">
                    <option>공부</option>
                    <option>학교</option>
                    <option>일상</option>
                    <option>기타</option>
                  </S.Select>
                </S.SelectBox>

                <S.SelectBox>
                  <S.Label>주제</S.Label>

                  <S.Select defaultValue="데이터수학통계 과목">
                    <option>주제 없음</option>
                    <option>데이터수학통계 과목</option>
                    <option>주제2</option>
                    <option>주제3</option>
                  </S.Select>
                </S.SelectBox>
              </S.SelectRow>
            </S.SaveSection>

            <S.Line />

            {/* 하단 버튼 */}
            <S.ButtonRow>
              <S.CancelButton type="button" onClick={() => setOpenPopup(null)}>
                취소
              </S.CancelButton>

              <S.ModifyButton type="button" onClick={() => setOpenPopup(null)}>
                수정
              </S.ModifyButton>
            </S.ButtonRow>
          </S.ModifyPopup>
        </S.PopupOverlay>
      )}

      {/* 삭제 팝업 */}
      {openPopup === 'delete' && (
        <S.DeletePopupOverlay>
          <S.DeletePopup>
            <S.DeletePopupTitle>정말 삭제하시겠습니까?</S.DeletePopupTitle>

            <S.PopupDescription>
              해당 정보가 삭제됩니다.
              <br />
              삭제한 항목은 복구할 수 없습니다.
            </S.PopupDescription>

            <S.PopupButtonBox>
              <S.DeleteCancelButton type="button" onClick={() => setOpenPopup(null)}>
                취소
              </S.DeleteCancelButton>

              <S.DeleteButton type="button" onClick={handleDeleteSchedule}>
                삭제
              </S.DeleteButton>
            </S.PopupButtonBox>
          </S.DeletePopup>
        </S.DeletePopupOverlay>
      )}
    </S.DetailContainer>
  );
}

export default Detail;
