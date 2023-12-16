import { BrowserWindow, ipcMain } from "electron";
import { MEMO_CHANNELS } from "./types";
import { ICON_PATH, LOAD_URL, PRELOAD_PATH } from "../utils";
import { getMainWindow } from "../main-window/main";
import { disableWindowClickable } from "../clickable/main";

let memoWindow: BrowserWindow | undefined;
export function createMemoWindow() {
  if (memoWindow) {
    memoWindow.show();
    return {
      window: memoWindow,
    };
  }

  memoWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Memo",
    icon: ICON_PATH,
    autoHideMenuBar: true,
    webPreferences: {
      preload: PRELOAD_PATH,
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
  });

  const mainWindow = getMainWindow();
  if (mainWindow) {
    // 由于主窗口是在最上层的
    // 所以在 memo 窗口聚焦时
    // 为了可以点击到 memo 窗口，需要主窗口忽略鼠标事件
    memoWindow.on("focus", () => {
      disableWindowClickable(mainWindow);
    });

    // 如果 memo 窗口失去焦点
    // 那么主窗口的应该忽略鼠标事件（默认状态）
    // 为了可以点击桌面的其他元素
    memoWindow.on("blur", () => {
      disableWindowClickable(mainWindow);
    });
  }

  memoWindow.loadURL(`${LOAD_URL}#/memo`);

  return {
    window: memoWindow,
  };
}

export function registerMemoWindowOpenEvent(listener: () => void) {
  ipcMain.on(MEMO_CHANNELS.OPEN, () => {
    listener();
  });
}
