import { ipcMain, shell } from "electron";
import { EXTERNAL_URL_CHANNELS } from "./types";

export function registerExternalUrlOpenEvent() {
  ipcMain.on(EXTERNAL_URL_CHANNELS.OPEN_URL, (_e, url) => {
    shell.openExternal(url);
  });
}
