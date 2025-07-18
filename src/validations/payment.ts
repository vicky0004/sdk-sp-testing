import { type PayCommandInput } from '../types/payloads';

export const validatePaymentPayload = (payload: PayCommandInput): boolean => {
  if (
    payload.token_symbol !== "KILT" && payload.amount < 0.1
  ) {
    console.error('USDC amount should be greater than $0.1');
    return false; // reject
  }

  return true; // accept
};