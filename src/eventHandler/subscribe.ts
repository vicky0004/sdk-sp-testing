import { ResponseEvent } from "../types/responses";
import { EventHandler } from "../types/responses";
import { listeners } from "../index";

export function subscribe<E extends ResponseEvent>(
    event: E,
    handler: EventHandler<E>,
  ): void {
    alert(`Subscribing to event: ${event}`);
    if (!handler || typeof handler !== 'function') {
      throw new Error('Event handler must be a function');
    }
    listeners.set(event, handler);
  }