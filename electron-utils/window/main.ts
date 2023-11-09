import { BrowserWindow, ipcMain } from "electron";
import { WindowChannels } from "./types";

export function ignoreMouseEvents(defaultWindow: BrowserWindow) {
  ipcMain.on(WindowChannels.SET_IGNORE_MOUSE_EVENTS, (e, ignore, options) => {
    const win = BrowserWindow.fromWebContents(e.sender);
    win?.setIgnoreMouseEvents(ignore, options);
  });

  defaultWindow.on("focus", () => {
    defaultWindow.setIgnoreMouseEvents(false);
  });
}
