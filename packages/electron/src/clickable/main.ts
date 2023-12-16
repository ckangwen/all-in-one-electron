import { BrowserWindow, ipcMain } from "electron";
import { CLICKABLE_CHANNELS } from "./types";

export function mainWindowDisableClick(mainWindow: BrowserWindow) {
  mainWindow.setIgnoreMouseEvents(true, {
    forward: true,
  });
}

export function mainWindowEnableClick(mainWindow: BrowserWindow) {
  mainWindow.setIgnoreMouseEvents(false);
}

/**
 * 如果 setIgnoreMouseEvents(true)，则窗口不再接收鼠标事件，可以点击穿透到桌面上其他的软件
 * 当项目启动时，允许点击穿透
 * 当窗口聚焦时，不允许点击穿透
 * 当鼠标移动到指定的元素上时，可以点击穿透
 */
export function ignoreMouseEvents(defaultWindow: BrowserWindow) {
  ipcMain.on(
    CLICKABLE_CHANNELS.SET_IGNORE_MOUSE_EVENTS,
    (e, ignore, options) => {
      const win = BrowserWindow.fromWebContents(e.sender);
      win?.setIgnoreMouseEvents(ignore, options);
    }
  );

  mainWindowDisableClick(defaultWindow);

  defaultWindow.on("focus", () => {
    mainWindowEnableClick(defaultWindow)
  });
}
