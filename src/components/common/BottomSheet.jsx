import { useState } from 'react';
import { Sheet } from 'react-modal-sheet';
import * as S from './BottomSheet.styles';

export default function BottomSheet({ isOpen, onClose }) {
  // 임시 데이터
  const [formData, setFormData] = useState({
    title: '데이터수학통계 중간고사 날짜',
    hasSchedule: true,
    schedule: '2025-04-22T15:00',
    category: '공부',
    topic: '데이터수학통계 과목',
    details:
      '📍 장소\n5호관 301호\n\n🎒 준비물\n계산기, 강의자료·책·필기 등 종이 자료',
    aiSummary:
      '데이터수학통계 중간고사는 4월 22일 오후 3시에 5호관 301호에서 진행됩니다.\n\n계산기와 종이 자료를 사용할 수 있으며, 시험에 필요한 분포표는 제공됩니다.',
  });

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancelClick = () => {
    setIsConfirmModalOpen(true);
  };

  const handleConfirmYes = () => {
    setIsConfirmModalOpen(false); // 팝업 닫기
    onClose(); // 바텀 시트도 닫기
  };

  const handleConfirmNo = () => {
    setIsConfirmModalOpen(false);
  };

  return (
    <>
      <Sheet
        isOpen={isOpen}
        onClose={handleCancelClick}
        snapPoints={[0, 0.7, 1]}
        initialSnap={1}
      >
        <Sheet.Container>
          <Sheet.Header />

          <Sheet.Content>
            <S.SheetContainer>
              <S.HeaderRow>
                <S.Title>등록하기</S.Title>
                <S.SubTitle>AI가 분석을 완료했어요! 💡</S.SubTitle>
              </S.HeaderRow>

              <S.WarningBox>
                <span className="icon">❗</span>
                AI가 분석한 내용에 오류가 있을 수 있어요.
                <br />
                저장 전 확인해주세요.
              </S.WarningBox>

              <S.FormGroup>
                <S.Label>제목</S.Label>
                <S.Input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </S.FormGroup>

              <S.FormGroup>
                <S.Label>일정</S.Label>
                <S.ScheduleRow>
                  <S.CheckboxWrapper
                    $isChecked={formData.hasSchedule}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        hasSchedule: !prev.hasSchedule,
                      }))
                    }
                  >
                    {formData.hasSchedule && '✓'}
                  </S.CheckboxWrapper>

                  <S.Input
                    type="datetime-local"
                    name="schedule"
                    value={formData.schedule}
                    onChange={handleChange}
                    disabled={!formData.hasSchedule}
                  />
                </S.ScheduleRow>
              </S.FormGroup>

              <S.FormGroup>
                <S.Label>세부사항</S.Label>
                <S.TextArea
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                />
              </S.FormGroup>

              <S.FormGroup>
                <S.Label>AI 요약</S.Label>
                <S.TextArea
                  name="aiSummary"
                  value={formData.aiSummary}
                  onChange={handleChange}
                />
              </S.FormGroup>

              <S.FormGroup>
                <S.Label>저장 위치</S.Label>
                <S.SelectRow>
                  <S.SelectGroup>
                    <S.SubLabel>카테고리</S.SubLabel>
                    <S.Select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                    >
                      <option value="공부">공부</option>
                      <option value="일정">일정</option>
                      <option value="기타">기타</option>
                    </S.Select>
                  </S.SelectGroup>

                  <S.SelectGroup>
                    <S.SubLabel>주제</S.SubLabel>
                    <S.Select
                      name="topic"
                      value={formData.topic}
                      onChange={handleChange}
                    >
                      <option value="데이터수학통계 과목">
                        데이터수학통계 과목
                      </option>
                      <option value="알고리즘">알고리즘</option>
                    </S.Select>
                  </S.SelectGroup>
                </S.SelectRow>
              </S.FormGroup>

              <S.ButtonGroup>
                <S.CancelButton onClick={handleCancelClick}>
                  취소
                </S.CancelButton>
                <S.SubmitButton onClick={() => alert('등록 완료!')}>
                  등록
                </S.SubmitButton>
              </S.ButtonGroup>
            </S.SheetContainer>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop onTap={handleCancelClick} />
      </Sheet>

      {/* 취소 모달 */}
      {isConfirmModalOpen && (
        <S.ModalOverlay>
          <S.ModalBox>
            <S.ModalTitle>등록을 취소하시겠습니까?</S.ModalTitle>
            <S.ModalDesc>작성 중인 정보가 저장되지 않습니다.</S.ModalDesc>
            <S.ModalButtonGroup>
              <S.ModalNoButton onClick={handleConfirmNo}>
                아니요
              </S.ModalNoButton>
              <S.ModalYesButton onClick={handleConfirmYes}>예</S.ModalYesButton>
            </S.ModalButtonGroup>
          </S.ModalBox>
        </S.ModalOverlay>
      )}
    </>
  );
}
