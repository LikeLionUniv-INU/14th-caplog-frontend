import { useEffect } from 'react';
import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { sendFcmToken } from '../api/auth';

export default function usePush() {
  useEffect(() => {
    // 웹에서는 실행 X
    if (!Capacitor.isNativePlatform()) return;

    const setupPush = async () => {
      await PushNotifications.register();

      // 고유 토큰 발급
      PushNotifications.addListener('registration', async (token) => {
        console.log('FCM 토큰 발급 성공:', token.value);
        try {
          const res = await sendFcmToken(token.value);
          if (res.isSuccess) {
            console.log('서버에 FCM 토큰 등록 완료');
          }
        } catch (error) {
          console.error('FCM 토큰 전송 에러:', error);
        }
      });

      PushNotifications.addListener('pushNotificationReceived', (notification) => {
        console.log('🔔 알림 도착:', notification);
        alert(`[${notification.title}]\n${notification.body}`);
      });

      // 앱 밖에서 들어온 경우
      PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
        console.log('👆 알림 누르고 진입:', notification);
      });
    };

    setupPush();

    return () => {
      PushNotifications.removeAllListeners();
    };
  }, []);
}
