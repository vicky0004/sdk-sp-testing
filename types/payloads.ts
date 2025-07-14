import { InitSuccess } from './responses';
import { InstallErrorCodes, InstallErrorMessage } from './errors';

export enum Tokens {
  KILT = 'KILT',
}

export enum Network {
  Kilt = 'kilt',
}

export enum Command {
  Pay = 'pay',
  init= 'init',
}

export type WebViewBasePayload = {
  command: Command;
  payload: Record<string, any>;
};

export type PayCommandInput = {
  amount: number;
  to: string; // wallet Address or web3name
  tip: number;
  fee: number;
  network?: Network;
  token_symbol?: Tokens;
};

export type InitCommandInput = {
  appId: string;
};

type CommandReturnPayloadMap = {
  [Command.Pay]: PayCommandInput;
  [Command.init]:InitCommandInput;
};

export type CommandReturnPayload<T extends Command> =
  T extends keyof CommandReturnPayloadMap ? CommandReturnPayloadMap[T] : never;

export type AsyncHandlerReturn<CommandPayload, FinalPayload> = Promise<{
  commandPayload: CommandPayload;
  finalPayload: FinalPayload;
}>;

export type InstallReturnType =
  | { success: true, initResult: InitSuccess }
  | {
      success: false;
      errorCode: InstallErrorCodes;
      errorMessage: (typeof InstallErrorMessage)[InstallErrorCodes];
    };