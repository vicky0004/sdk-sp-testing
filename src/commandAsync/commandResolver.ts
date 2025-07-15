import { ResponseEvent, EventPayload} from "../types/responses";
import { Command } from "../types/payloads";
import { CommandReturnPayload } from "../types/payloads";
import { AsyncHandlerReturn } from "../types/payloads";
import { COMMAND_TIMEOUT } from "../constants/constantVariables";
import { unsubscribe } from "../eventHandler/unsubscribe";
import { subscribe } from "../eventHandler/subscribe";

export async function  awaitCommand<
    E extends ResponseEvent,
    C extends Command,
    T extends EventPayload<E>,
  >(
    event: E,
    command: C,
    executor: () => CommandReturnPayload<C> | null,
  ): AsyncHandlerReturn<CommandReturnPayload<C> | null, T> {
    alert(`Awaiting command: ${command} for event: ${event}`);
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        unsubscribe(event);
        reject(new Error(`Command ${command} timed out after ${COMMAND_TIMEOUT}ms`));
      }, COMMAND_TIMEOUT);

      let commandPayload: CommandReturnPayload<C> | null = null;
      
      const handleAndUnsubscribe = (payload: EventPayload<E>) => {
        clearTimeout(timeoutId);
        unsubscribe(event);
        resolve({ commandPayload, finalPayload: payload as T });
      };

      try {
        subscribe(event, handleAndUnsubscribe);
        commandPayload = executor();
      } catch (error) {
        clearTimeout(timeoutId);
        unsubscribe(event);
        reject(error);
      }
    });
  }