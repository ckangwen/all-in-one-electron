import { ipcRenderer } from "electron";
import { APP_CHANNELS } from "../channels";

export function openWeReadWindow() {
  ipcRenderer.send(APP_CHANNELS.OPEN_WEREAD);
}
