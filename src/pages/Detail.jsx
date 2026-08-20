import * as S from './Detail.style';
import back from '../assets/back.svg';
import modifyicon from '../assets/modify.svg';
import deleteicon from '../assets/delete.svg';
import aiIcon from '../assets/aiIcon.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getScheduleDetail, deleteSchedule, updateSchedule, getGroupList } from '../api/scheduleDetailApi';
import { getCategoryList } from '../api/groupApi';

function Detail() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [openPopup, setOpenPopup] = useState(null);

  const [detail, setDetail] = useState(null);

  // 일정 사용 여부
  const [scheduleEnabled, setScheduleEnabled] = useState(true);

  // 날짜 / 시간
  const [schedule, setSchedule] = useState('');

  // 수정 팝업 입력값
  const [editTitle, setEditTitle] = useState('');
  const [editDetails, setEditDetails] = useState('');
  const [editAiSummary, setEditAiSummary] = useState('');

  // 저장 위치
  const [editCategory, setEditCategory] = useState('');
  const [editGroup, setEditGroup] = useState('');

  // 카테고리 / 주제 목록
  const [categoryList, setCategoryList] = useState([]);
  const [groupList, setGroupList] = useState([]);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await getScheduleDetail(id);

        setDetail(data.result);

        setSchedule(data.result.events[0].startAt);

        setScheduleEnabled(data.result.events[0].hasDate);

        const currentEvent = data.result.events[0];

        setEditTitle(currentEvent.title ?? '');
        setEditDetails(currentEvent.details ?? '');
        setEditAiSummary(data.result.aiSummary ?? '');
        setEditCategory(data.result.category ?? 'TOTAL');
        setEditGroup(data.result.group ?? '');
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

  const CATEGORY_LIST = ['TOTAL', 'STUDY', 'SCHOOL', 'DAILY', 'ETC'];
  const CATEGORY_LABEL = {
    TOTAL: '전체',
    STUDY: '공부',
    SCHOOL: '학교',
    DAILY: '일상',
    ETC: '기타',
  };

  // 수정 팝업 열기
  const handleOpenModify = async () => {
    try {
      const groupData = await getGroupList(0);

      setCategoryList(CATEGORY_LIST);
      setGroupList(groupData.result?.groupList ?? []);

      setOpenPopup('modify');
    } catch (error) {
      console.error('수정 정보 목록 조회 실패:', error);
    }
  };

  // 일정 수정
  const handleUpdateSchedule = async () => {
    try {
      const updateData = {
        schedule: {
          title: editTitle,
          aiSummary: editAiSummary,
          category: editCategory,
          hasGroup: Boolean(editGroup),
          group: editGroup,
        },

        events: [
          {
            id: event.id,
            title: editTitle,
            startAt: schedule,
            endAt: schedule,
            location: event.location ?? '',
            details: editDetails,
          },
        ],
      };

      const result = await updateSchedule(id, updateData);

      if (result.isSuccess) {
        setDetail((prev) => ({
          ...prev,

          schedule: {
            ...prev.schedule,
            ...updateData.schedule,
          },

          events: [
            {
              ...prev.events[0],

              title: editTitle,
              details: editDetails,
              aiSummary: editAiSummary,
              dateTime: schedule,
            },
          ],
        }));

        setOpenPopup(null);
      }
    } catch (error) {
      console.error('일정 수정에 실패했습니다:', error);
    }
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
          <S.BackButton type="button" onClick={() => navigate(-1)}>
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
          <S.Dday>{getDday(event.startAt)}</S.Dday>
        </S.TitleRow>

        <S.Divider />

        <S.SummaryHeader>
          <S.SummaryTitle>
            <img src={aiIcon} alt="ai아이콘" />
            CapLog AI 분석 요약
          </S.SummaryTitle>

          <S.ButtonGroup>
            <S.IconButton type="button" onClick={handleOpenModify}>
              <img src={modifyicon} alt="수정" />
            </S.IconButton>

            <S.IconButton type="button" onClick={() => setOpenPopup('delete')}>
              <img src={deleteicon} alt="삭제" />
            </S.IconButton>
          </S.ButtonGroup>
        </S.SummaryHeader>

        <S.SummaryBox>
          <p>{detail.aiSummary}</p>
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

              <S.TextInput value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
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

              <S.TextArea value={editDetails} onChange={(e) => setEditDetails(e.target.value)} />
            </S.FormGroup>

            {/* AI 요약 */}
            <S.FormGroup>
              <S.Label>AI 요약</S.Label>

              <S.TextArea value={editAiSummary} onChange={(e) => setEditAiSummary(e.target.value)} />
            </S.FormGroup>

            {/* 저장 위치 */}
            <S.SaveSection>
              <S.SaveTitle>저장 위치</S.SaveTitle>

              <S.SelectRow>
                <S.SelectBox>
                  <S.Label>카테고리</S.Label>

                  <S.Select value={editCategory} onChange={(e) => setEditCategory(e.target.value)}>
                    {categoryList.map((category) => (
                      <option key={category} value={category}>
                        {CATEGORY_LABEL[category]}
                      </option>
                    ))}
                  </S.Select>
                </S.SelectBox>

                <S.SelectBox>
                  <S.Label>주제</S.Label>

                  <S.Select value={editGroup} onChange={(e) => setEditGroup(e.target.value)}>
                    <option value="">주제 없음</option>

                    {groupList.map((group) => (
                      <option key={group.groupId} value={group.groupName}>
                        {group.groupName}
                      </option>
                    ))}
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

              <S.ModifyButton type="button" onClick={handleUpdateSchedule}>
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
