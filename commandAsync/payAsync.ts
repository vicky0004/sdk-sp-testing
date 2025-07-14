import { sporranSDK } from '../index';
import { PayCommandInput, AsyncHandlerReturn, Command } from '../types/payloads';
import { PaymentResponse, ResponseEvent } from '../types/responses';
import { commands } from '../commands';
import { awaitCommand } from './commandResolver';

export const payAsync = async (
  payload: PayCommandInput,
): AsyncHandlerReturn<PayCommandInput | null, PaymentResponse> => {
  if (!sporranSDK.isReady) {
        console.error("'pay' command unavailable: Sporran SDK not installed");
        return Promise.reject(new Error('Sporran SDK not installed'));
      }

      try {
        return await awaitCommand(
          ResponseEvent.Payment,
          Command.Pay,
          () => commands.pay(payload),
        );
      } catch (error) {
        console.error('Async pay command failed:', error);
        throw error;
      }
};
