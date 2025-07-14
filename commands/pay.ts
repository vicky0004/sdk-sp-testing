import { Command,PayCommandInput,Network } from '../types/payloads';
import { validatePaymentPayload } from '../validations/payment';
import { handleMessage } from '../utils/common';


export const pay = (payload: PayCommandInput): PayCommandInput | null => {
  if (!validatePaymentPayload(payload)) {
    console.error("'pay' command failed: invalid payload");
    return null;
  }

  const eventPayload: PayCommandInput = {
    ...payload,
    network: Network.Kilt,
  };

  try {
    handleMessage({
      command: Command.Pay,
      payload: eventPayload,
    });
    return eventPayload;
  } catch (error) {
    console.error("'pay' command failed:", error);
    return null;
  }
};
