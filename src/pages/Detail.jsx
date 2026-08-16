import * as S from "./Detail.style";
import back from "../assets/back.svg";
import modifyicon from "../assets/modify.svg";
import deleteicon from "../assets/delete.svg";
import testday from "../assets/testday.png"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Detail() {
  const navigate = useNavigate();

  const [openPopup, setOpenPopup] = useState(null);

   // 일정 사용 여부
  const [scheduleEnabled, setScheduleEnabled] = useState(true);

  // 달력 팝업 열림 여부
  const [scheduleOpen, setScheduleOpen] = useState(false);

  // 일정 입력창
  const [scheduleText, setScheduleText] =
    useState("2025.04.22(수) 15:00");

  // 달력 / 시간
  const [date, setDate] = useState("2025-04-22");
  const [time, setTime] = useState("15:00");

  const handleDateChange = (e) => {
    const newDate = e.target.value;

    setDate(newDate);

    const formattedDate = newDate.replaceAll("-", ".");

    setScheduleText(`${formattedDate} ${time}`);
  };

  const handleTimeChange = (e) => {
    const newTime = e.target.value;

    setTime(newTime);

    const formattedDate = date.replaceAll("-", ".");

    setScheduleText(`${formattedDate} ${newTime}`);
  };

  return (
    <S.DetailContainer>
      <S.ImageSection>
        <S.Header>
          <S.BackButton onClick={() => navigate("/group")}>
            <img src={back} alt="뒤로가기" />
          </S.BackButton>
        </S.Header>

        <S.ImageButton type="button" onClick={() => setOpenPopup("fullScreen")}>
          <img src={testday} alt="사진" />
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
            <S.IconButton type="button" onClick={() => setOpenPopup("modify")}>
              <img src={modifyicon} alt="수정" />
            </S.IconButton>

            <S.IconButton type="button" onClick={() => setOpenPopup("delete")}>
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

      {openPopup === "fullScreen" && (
  <S.FullScreenOverlay>
    <S.FullScreenHeader>
      <S.BackButton onClick={() => setOpenPopup(null)}>
        <img src={back} alt="뒤로가기" />
      </S.BackButton>
    </S.FullScreenHeader>

    <S.FullScreenImageBox>
      <S.FullScreenImage src={testday} alt="사진" />
    </S.FullScreenImageBox>
  </S.FullScreenOverlay>
)}

      {openPopup === "modify" && (
        <S.PopupOverlay>

          <S.ModifyPopup>

            <S.PopupTitle>수정하기</S.PopupTitle>

            {/* 제목 */}
            <S.FormGroup>
              <S.Label>제목</S.Label>

              <S.TextInput
                defaultValue="데이터수학통계 중간고사 날짜"
              />
            </S.FormGroup>


            {/* 일정 */}
            <S.FormGroup>
              <S.Label>일정</S.Label>

              <S.ScheduleRow>

                <S.CheckBox
                  type="checkbox"
                  checked={scheduleEnabled}
                  onChange={(e) => {
                    setScheduleEnabled(e.target.checked);

                    if (!e.target.checked) {
                      setScheduleOpen(false);
                    }
                  }}
                />

                <S.ScheduleInput
                  value={scheduleText}
                  disabled={!scheduleEnabled}
                  onChange={(e) =>
                    setScheduleText(e.target.value)
                  }
                  onClick={() => {
                    if (scheduleEnabled) {
                      setScheduleOpen(true);
                    }
                  }}
                />

                {/* 일정 선택창 */}
                {scheduleOpen && scheduleEnabled && (
                  <S.SchedulePopup>

                    <S.SchedulePopupTitle>
                      날짜 선택
                    </S.SchedulePopupTitle>

                    <S.DateInput
                      type="date"
                      value={date}
                      onChange={handleDateChange}
                    />

                    <S.SchedulePopupTitle>
                      시간
                    </S.SchedulePopupTitle>

                    <S.TimeInput
                      type="time"
                      value={time}
                      onChange={handleTimeChange}
                    />

                    <S.ScheduleCloseButton
                      type="button"
                      onClick={() =>
                        setScheduleOpen(false)
                      }
                    >
                      확인
                    </S.ScheduleCloseButton>

                  </S.SchedulePopup>
                )}

              </S.ScheduleRow>
            </S.FormGroup>


            {/* 세부사항 */}
            <S.FormGroup>
              <S.Label>세부사항</S.Label>

              <S.TextArea
                defaultValue={`📍 장소
5호관 301호

🎒 준비물
계산기, 강의자료, 책, 필기 등 종이 자료`}
              />
            </S.FormGroup>


            {/* AI 요약 */}
            <S.FormGroup>
              <S.Label>AI 요약</S.Label>

              <S.TextArea
                defaultValue={`데이터수학통계 중간고사는 4월 22일 오후 3시에 5호관 301호에서 진행됩니다.
                              계산기와 종이 자료를 사용할 수 있으며, 시험에 필요한 분포표는 제공됩니다.`}
              />
            </S.FormGroup>


            {/* 저장 위치 */}
            <S.SaveSection>

              <S.SaveTitle>저장 위치</S.SaveTitle>

              <S.SelectRow>

                <S.SelectBox>
                  <S.Label>카테고리</S.Label>

                  <S.Select>
                    <option>공부</option>
                    <option>학교</option>
                    <option>일상</option>
                    <option>기타</option>
                  </S.Select>
                </S.SelectBox>


                <S.SelectBox>
                  <S.Label>주제</S.Label>

                  <S.Select>
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

              <S.CancelButton
                type="button"
                onClick={() =>
                  setOpenPopup(null)
                }
              >
                취소
              </S.CancelButton>

              <S.ModifyButton
                type="button"
                onClick={() =>
                  setOpenPopup(null)
                }
              >
                수정
              </S.ModifyButton>

            </S.ButtonRow>

          </S.ModifyPopup>

        </S.PopupOverlay>
      )}

      {openPopup === "delete" && (
  <S.DeletePopupOverlay>
    <S.DeletePopup>
      <S.DeletePopupTitle>
        정말 삭제하시겠습니까?
      </S.DeletePopupTitle>

      <S.PopupDescription>
        해당 정보가 삭제됩니다.
        <br />
        삭제한 항목은 복구할 수 없습니다.
      </S.PopupDescription>

      <S.PopupButtonBox>
        <S.DeleteCancelButton
          type="button"
          onClick={() => setOpenPopup(null)}
        >
          취소
        </S.DeleteCancelButton>

        <S.DeleteButton
          type="button"
          onClick={() => setOpenPopup(null)}
        >
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