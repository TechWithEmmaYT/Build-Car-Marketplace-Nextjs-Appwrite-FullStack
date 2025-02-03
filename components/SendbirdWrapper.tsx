"use client";

import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import { APP_CONFIG } from "@/lib/app-config";

interface SendbirdWrapperProps {
  userId: string;
  nickname: string;
  children: React.ReactNode;
}

export const SendbirdWrapper = ({
  userId,
  nickname,
  children,
}: SendbirdWrapperProps) => {
  return (
    <SendbirdProvider
      appId={APP_CONFIG.SEND_BIRD.APP_ID}
      userId={userId}
      nickname={nickname}
    >
      {children}
    </SendbirdProvider>
  );
};
