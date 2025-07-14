import { SPORRAN_SDK_MINOR_VERSION, SPORRAN_SDK_VERSION } from "../constants/constantVariables";
import { sendWebviewMessage } from "../eventHandler/sendMessage";
import { Command } from "../types/payloads";
import { InitResponse, ResponseEvent } from "../types/responses";
import { awaitCommand } from "./commandResolver";


 export async function init(appId: string): Promise<InitResponse> {
    const result = await awaitCommand(
      ResponseEvent.Init,
      Command.init,
      () => {
        sendWebviewMessage({
          command: 'init',
          payload: {
            appid: appId,
            version: SPORRAN_SDK_VERSION,
            minorVersion: SPORRAN_SDK_MINOR_VERSION,
          },
        });
        return null;
      },
    );
    return result.finalPayload; // return payload to check status
  }