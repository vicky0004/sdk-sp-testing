
  import { ResponseEvent } from "../types/responses";
  import { EventPayload } from "../types/responses";
  import { listeners } from "..";
  
  export function trigger(event: ResponseEvent, payload: EventPayload): void {
    const handler = listeners.get(event);
    if (!handler) {
      console.warn(`No handler registered for event: ${event}`);
      return;
    }

    try {
      handler(payload);
    } catch (error) {
      console.error(`Error in event handler for ${event}:`, error);
    }
  }