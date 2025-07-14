import { sendWebviewMessage } from "../eventHandler/sendMessage";
import { WebViewBasePayload } from "../types/payloads";

export const handleMessage = <T extends WebViewBasePayload = WebViewBasePayload>(
  payload: T,
): void => {
  try {
    sendWebviewMessage(payload);
  } catch (error) {
    console.error('Failed to send message to main app :', error);
    throw error;
  }
};

