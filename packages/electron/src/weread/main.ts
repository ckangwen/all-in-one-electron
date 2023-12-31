import { BrowserWindow, app, ipcMain } from "electron";
import { WEREAD_ICON_PATH } from "../utils";
import { APP_CHANNELS } from "../channels";

const scrollbarCss = `
body {
  --sb-track-color: #232E33;
  --sb-thumb-color: #7ecfbd;
  --sb-size: 6px;
  scrollbar-color: var(--sb-thumb-color) var(--sb-track-color);
}

body::-webkit-scrollbar {
  width: var(--sb-size);
}

body::-webkit-scrollbar-track {
  background: var(--sb-track-color);
  border-radius: 10px;
}

body::-webkit-scrollbar-thumb {
  background: var(--sb-thumb-color);
  border-radius: 10px;
}
`;

let weReadWindow: BrowserWindow | null = null;
export function createWeReadWindow() {
  if (weReadWindow) {
    weReadWindow.show();
    return weReadWindow;
  }

  const win = new BrowserWindow({
    width: 439,
    height: 700,
    x: 100,
    y: 100,
    icon: WEREAD_ICON_PATH,
    autoHideMenuBar: true,
  });
  win.loadURL("https://weread.qq.com/");
  win.webContents.insertCSS(scrollbarCss);
  weReadWindow = win;

  app.on("before-quit", () => {
    weReadWindow = null;
  });

  return win;
}

export function registerWeReadOpenEvent(listener: () => void) {
  ipcMain.on(APP_CHANNELS.OPEN_WEREAD, () => {
    listener();
  });
}
