import { Network } from './payloads';
import { PaymentErrorCodes } from './errors';

export enum ResponseEvent {
  Payment = 'payment',
  Init = 'init'
}

export type InitSuccess = {
  status: string;
  did?: string;
  web3Name?: string;
  walletAddress?: string;
  email?: string;
  name?: string;
}

export type InitError = {
  status: string;
  message: string;
};

export type InitResponse = InitSuccess | InitError ;

export type PaymentSuccess = {
  status: string;
  transaction_status: string;
  transaction_id: string;
  from: string;
  chain: Network;
  timestamp: string;
};

export type PaymentError = {
  status: string;
  error_code: PaymentErrorCodes;
};

export type PaymentResponse = PaymentSuccess | PaymentError;

type EventPayloadMap = {
  [ResponseEvent.Payment]: PaymentResponse;
  [ResponseEvent.Init]: InitResponse;
};

export type EventPayload<T extends ResponseEvent = ResponseEvent> =
  T extends keyof EventPayloadMap ? EventPayloadMap[T] : never;

export type EventHandler<E extends ResponseEvent = ResponseEvent> = <
  T extends EventPayload<E>,
>(
  data: T,
) => void;