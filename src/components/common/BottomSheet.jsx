import { useState, useEffect } from 'react';
import { Sheet } from 'react-modal-sheet';
import * as S from './BottomSheet.styles';
import { useNavigate } from 'react-router-dom';
import { getCategoryList, getGroupList, confirmUpload } from '../../api/upload';

export default function BottomSheet({ isOpen, onClose, aiResult }) {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [groups, setGroups] = useState([]);
  const [scheduleData, setScheduleData] = useState({
    title: '',
    aiSummary: '',
    captureImg: '',
    category: 'TOTAL',
    topic: '',
  });

  // 추출된 개별 일정 상태
  const [events, setEvents] = useState([]);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  // 바텀시트 열릴 때 초기 데이터 세팅
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [catRes, groupRes] = await Promise.all([
          getCategoryList(),
          getGroupList(0),
        ]);
        if (catRes.isSuccess) setCategories(catRes.result.categories);
        if (groupRes.isSuccess) setGroups(groupRes.result.groupList);
      } catch (error) {
        console.error('분류 옵션 로드 실패:', error);
      }
    };
    fetchOptions();
  }, []);

  useEffect(() => {
    if (isOpen && aiResult) {
      const timer = setTimeout(() => {
        setScheduleData({
          title: aiResult.schedule?.title || '',
          aiSummary: aiResult.schedule?.aiSummary || '',
          captureImg: aiResult.schedule?.captureImg || '',
          category: 'TOTAL',
          topic: '',
        });

        const initialEvents = (aiResult.events || []).map((event) => ({
          ...event,
          isChecked: true,
        }));
        setEvents(initialEvents);
      }, 200);

      return () => clearTimeout(timer);
    } else if (!isOpen) {
      setEvents([]);
    }
  }, [isOpen, aiResult]);

  // 공통 변경 핸들러 (제목, 요약, 카테고리, 그룹)
  const handleScheduleChange = (e) => {
    const { name, value } = e.target;
    setScheduleData((prev) => ({ ...prev, [name]: value }));
  };

  // 개별 일정 변경 핸들러
  const handleEventChange = (index, field, value) => {
    setEvents((prev) => {
      const newEvents = [...prev];
      newEvents[index] = { ...newEvents[index], [field]: value };
      return newEvents;
    });
  };

  const handleCancelClick = () => setIsConfirmModalOpen(true);
  const handleConfirmNo = () => setIsConfirmModalOpen(false);
  const handleConfirmYes = () => {
    setIsConfirmModalOpen(false);
    onClose();
  };

  /** 업로드 확정 API */
  const handleSubmit = async () => {
    // 체크된 일정만 필터링 (체크 안 된 건 자동 폐기)
    const selectedEvents = events.filter((e) => e.isChecked);

    if (selectedEvents.length === 0) {
      alert('등록할 일정을 최소 1개 이상 체크해주세요.');
      return;
    }

    const formattedEvents = selectedEvents.map((e) => ({
      Id: e.Id,
      title: e.title,
      dateTime: e.dateTime || null, // 빈 날짜는 null 처리
      details: e.details,
    }));

    const hasGroup = !!scheduleData.topic;

    const formattedSchedule = {
      title: scheduleData.title,
      captureImg: scheduleData.captureImg,
      aiSummary: scheduleData.aiSummary,
      hasGroup: hasGroup,
      group: hasGroup ? scheduleData.topic : 'NONE', // 그룹이 없으면 NONE
    };

    try {
      const response = await confirmUpload(formattedSchedule, formattedEvents);

      if (response.isSuccess) {
        alert('일정이 성공적으로 등록되었습니다!');
        onClose();
        navigate('/home');
      } else {
        alert(response.message || '등록 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('업로드 확정 에러:', error);
      alert('서버와 통신할 수 없습니다.');
    }
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
                  value={scheduleData.title}
                  onChange={handleScheduleChange}
                />
              </S.FormGroup>

              {/* 일정 목록 렌더링 */}
              {events.map((event, index) => (
                <div key={event.Id || index}>
                  <S.FormGroup>
                    <S.Label>
                      {events.length > 1
                        ? `일정 ${index + 1}: ${event.title}`
                        : '일정'}
                    </S.Label>

                    <S.ScheduleRow>
                      <S.CheckboxWrapper
                        $isChecked={event.isChecked}
                        onClick={() =>
                          handleEventChange(
                            index,
                            'isChecked',
                            !event.isChecked,
                          )
                        }
                      >
                        {event.isChecked && '✓'}
                      </S.CheckboxWrapper>

                      <S.Input
                        type="datetime-local"
                        value={event.dateTime || ''}
                        onChange={(e) =>
                          handleEventChange(index, 'dateTime', e.target.value)
                        }
                        disabled={!event.isChecked}
                      />
                    </S.ScheduleRow>
                  </S.FormGroup>

                  <S.FormGroup>
                    <S.Label>세부사항</S.Label>
                    <S.TextArea
                      value={event.details || ''}
                      onChange={(e) =>
                        handleEventChange(index, 'details', e.target.value)
                      }
                      disabled={!event.isChecked}
                    />
                  </S.FormGroup>
                </div>
              ))}

              <S.FormGroup>
                <S.Label>AI 요약</S.Label>
                <S.TextArea
                  name="aiSummary"
                  value={scheduleData.aiSummary}
                  onChange={handleScheduleChange}
                />
              </S.FormGroup>

              <S.FormGroup>
                <S.Label>저장 위치</S.Label>
                <S.SelectRow>
                  <S.SelectGroup>
                    <S.SubLabel>카테고리</S.SubLabel>
                    <S.Select
                      name="category"
                      value={scheduleData.category}
                      onChange={handleScheduleChange}
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </S.Select>
                  </S.SelectGroup>

                  <S.SelectGroup>
                    <S.SubLabel>주제</S.SubLabel>
                    <S.Select
                      name="topic"
                      value={scheduleData.topic}
                      onChange={handleScheduleChange}
                    >
                      <option value="">그룹 선택 안함</option>
                      {groups.map((grp) => (
                        <option key={grp.groupId} value={grp.groupId}>
                          {grp.groupName}
                        </option>
                      ))}
                    </S.Select>
                  </S.SelectGroup>
                </S.SelectRow>
              </S.FormGroup>

              <S.ButtonGroup>
                <S.CancelButton onClick={handleCancelClick}>
                  취소
                </S.CancelButton>
                <S.SubmitButton onClick={handleSubmit}>등록</S.SubmitButton>
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
