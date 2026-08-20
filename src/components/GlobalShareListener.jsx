import { useEffect } from 'react';
import { SendIntent } from 'capacitor-plugin-send-intent';

export default function GlobalShareListener() {
  useEffect(() => {
    const checkInitialIntent = async () => {
      try {
        const result = await SendIntent.checkSendIntentReceived();
        const sharedUrl = result?.url || result?.value || result?.imageUri;

        if (sharedUrl) {
          localStorage.setItem('pendingSharedImage', sharedUrl);
        }
      } catch (error) {
        console.error('초기 인텐트 확인 실패:', error);
      }
    };

    checkInitialIntent();
  }, []);

  return null;
}
