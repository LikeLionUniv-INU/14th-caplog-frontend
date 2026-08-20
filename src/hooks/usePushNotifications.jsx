import { useEffect } from 'react';
import { PushNotifications } from '@capacitor/push-notifications';
import { useNavigate } from 'react-router-dom';

export function usePushNotifications() {
  const navigate = useNavigate();

  useEffect(() => {
    // FCM 토큰 수신 → 서버에 저장
    PushNotifications.addListener('registration', (token) => {
      console.log('FCM Token:', token.value);
    });

    // 포그라운드 알림 수신
    PushNotifications.addListener('pushNotificationReceived', (notification) => {
      console.log('알림 수신:', notification);
    });

    // 알림 탭 → 특정 페이지 이동
    PushNotifications.addListener('pushNotificationActionPerformed', (action) => {
      const targetPage = action.notification.data?.targetPage;
      if (targetPage) {
        navigate(targetPage);
      }
    });

    return () => {
      PushNotifications.removeAllListeners();
    };
  }, []);
}
