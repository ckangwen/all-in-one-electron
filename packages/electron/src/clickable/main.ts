import { BrowserWindow, ipcMain } from "electron";
import { CLICKABLE_CHANNELS } from "./types";

export function disableWindowClickable(mainWindow: BrowserWindow) {
  mainWindow.setIgnoreMouseEvents(true, {
    forward: true,
  });
}

export function enableWindowClickable(mainWindow: BrowserWindow) {
  mainWindow.setIgnoreMouseEvents(false);
}

let isFirstFocus = true;
/**
 * 如果 setIgnoreMouseEvents(true)，则窗口不再接收鼠标事件，可以点击穿透到桌面上其他的软件
 * 当项目启动时，允许点击穿透
 * 当窗口聚焦时，不允许点击穿透
 * 当鼠标移动到指定的元素上时，可以点击穿透
 */
export function registerWindowMouseEvents(mainWindow: BrowserWindow) {
  ipcMain.on(
    CLICKABLE_CHANNELS.SET_IGNORE_MOUSE_EVENTS,
    (e, ignore, options) => {
      const win = BrowserWindow.fromWebContents(e.sender);
      win?.setIgnoreMouseEvents(ignore, options);
    }
  );

  disableWindowClickable(mainWindow);

  mainWindow.on("focus", () => {
    // 初次聚焦，即项目启动时，需要允许点击穿透（为了能够正常地点击桌面上其他的应用）
    if (isFirstFocus) {
      disableWindowClickable(mainWindow);
      isFirstFocus = false;
      return;
    }

    enableWindowClickable(mainWindow);
  });
}
