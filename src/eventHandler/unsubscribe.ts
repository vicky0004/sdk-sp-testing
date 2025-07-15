import { ResponseEvent } from "../types/responses";
import { listeners } from "../index";

export function unsubscribe(event: ResponseEvent): boolean {
    alert(`Unsubscribing from event: ${event}`);
    return listeners.delete(event);
  }