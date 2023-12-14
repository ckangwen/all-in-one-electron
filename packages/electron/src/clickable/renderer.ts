import { ipcRenderer } from "electron";
import { CLICKABLE_CHANNELS } from "./types";

export * from "./components";

export function forceIgnoreWindowMouseEvents() {
  ipcRenderer.send(CLICKABLE_CHANNELS.SET_IGNORE_MOUSE_EVENTS, true, {
    forward: true,
  });
}
