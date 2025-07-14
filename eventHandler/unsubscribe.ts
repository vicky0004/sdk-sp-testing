import { ResponseEvent } from "../types/responses";
import { listeners } from "..";

export function unsubscribe(event: ResponseEvent): boolean {
    return listeners.delete(event);
  }