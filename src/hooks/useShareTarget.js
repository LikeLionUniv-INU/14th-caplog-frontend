import { useEffect } from 'react';
import { SendIntent } from 'capacitor-plugin-send-intent';
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';

export default function useShareTarget(onImageReceived) {
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    const checkSharedImage = async () => {
      try {
        // 공유하기를 통해 앱으로 들어왔는지 확인
        const result = await SendIntent.checkSendIntentReceived();

        if (result && result.url) {
          console.log('갤러리에서 공유받은 이미지 데이터:', result);
          onImageReceived(result.url);
        }
      } catch (error) {
        console.error('공유 인텐트 수신 에러:', error);
      }
    };

    checkSharedImage();

    const appRestoredListener = App.addListener('appStateChange', (state) => {
      if (state.isActive) {
        checkSharedImage();
      }
    });

    return () => {
      if (appRestoredListener) {
        appRestoredListener.remove();
      }
    };
  }, [onImageReceived]);
}
