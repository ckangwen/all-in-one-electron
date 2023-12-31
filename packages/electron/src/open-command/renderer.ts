import { ipcRenderer } from "electron";
import { APP_CHANNELS } from "../channels";

export function onOpenCommandChange(listener: () => void) {
  ipcRenderer.on(APP_CHANNELS.OPEN_COMMAND, () => {
    listener();
  });
}
