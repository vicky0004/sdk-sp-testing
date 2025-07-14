import { DeviceProperties } from "./types/common";
import { ResponseEvent } from "./types/responses";
import { EventHandler } from "./types/responses";
import { commands } from "./commands/index";
import { commandsAsync } from "./commandAsync/index";
import { install } from "./commands/install";

export const listeners: Map<ResponseEvent, EventHandler> = new Map();

export class sporranSDK {
    public static appId: string | null = null;
    public static deviceProperties: DeviceProperties = {};
    public static isReady: boolean = false;
    public static install = install ;
    public static commands = commands;
    public static commandAsync = commandsAsync;
}