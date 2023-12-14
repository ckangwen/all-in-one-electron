import { BrowserWindow, ipcMain } from "electron";
import { CLICKABLE_CHANNELS } from "./types";

export function ignoreMouseEvents(defaultWindow: BrowserWindow) {
  ipcMain.on(CLICKABLE_CHANNELS.SET_IGNORE_MOUSE_EVENTS, (e, ignore, options) => {
    const win = BrowserWindow.fromWebContents(e.sender);
    win?.setIgnoreMouseEvents(ignore, options);
  });

  defaultWindow.on("focus", () => {
    defaultWindow.setIgnoreMouseEvents(false);
  });
}
