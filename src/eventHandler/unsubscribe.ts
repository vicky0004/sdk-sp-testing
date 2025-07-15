import { ResponseEvent } from "../types/responses";
import { listeners } from "../index";

export function unsubscribe(event: ResponseEvent): boolean {
    return listeners.delete(event);
  }