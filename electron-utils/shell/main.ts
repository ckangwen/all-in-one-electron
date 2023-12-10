import { ipcMain, shell } from "electron";
import { ShellEvents } from "./types";

export function onExternalUrlOpen() {
  ipcMain.on(ShellEvents.OPEN_EXTERNAL, (_e, url) => {
    shell.openExternal(url);
  });
}
