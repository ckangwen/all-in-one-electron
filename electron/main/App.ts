import { app, BrowserView, BrowserWindow } from "electron";
import { onNotify } from "../../electron-utils/notification/main";
import { ignoreMouseEvents } from "../../electron-utils/window/main";
import { onWindowDrag } from "../../electron-utils/drag/main";
import { ICON_PATH, PRELOAD_PATH } from "./libs/filepath";
import createTray from "./libs/createTray";
import { getCurrentDisplay, LOAD_URL } from "./libs/utils";
import { onExternalUrlOpen } from '../../electron-utils/shell/main';

export default class App {
  mainBrowserWindow: BrowserWindow | null = null;

  constructor() {
    this.beforeReady();
    this.onMessage();

    app.whenReady().then(() => {
      this.createMainWindow();
      ignoreMouseEvents(this.mainBrowserWindow!);

      createTray({
        menus: [
          {
            label: "Show Window",
            click: () => {
              this.mainBrowserWindow?.show();
            },
          },
          {
            label: "Hide Window",
            click: () => {
              this.mainBrowserWindow?.hide();
            },
          },
          { type: "separator" },
          {
            label: "Exit",
            click: () => {
              app.exit();
            },
          },
        ],
      });
    });
  }

  beforeReady() {
    app.disableHardwareAcceleration();
    if (!app.requestSingleInstanceLock()) {
      app.quit();
      process.exit(0);
    }

    app.on("window-all-closed", () => {
      app.quit();
    });

    app.setAppUserModelId("Revealing");
  }

  createMainWindow() {
    const currentDisplay = getCurrentDisplay();

    const mainWindow = new BrowserWindow({
      title: "Revealing",
      icon: ICON_PATH,
      y: currentDisplay.workArea.y,
      x: currentDisplay.workArea.x,
      width: currentDisplay.workArea.width,
      height: currentDisplay.workArea.height,
      // https://github.com/electron/electron/issues/611
      // 设置 resizable 为 false
      // 否则如果有元素紧贴窗口边缘，那么鼠标移动到边缘时，无法检测到
      resizable: false,
      transparent: true,
      alwaysOnTop: true,
      skipTaskbar: true,
      frame: false,
      webPreferences: {
        preload: PRELOAD_PATH,
        nodeIntegration: true,
        contextIsolation: false,
        webSecurity: false,
      },
    });

    this.mainBrowserWindow = mainWindow;
    bingSetup(mainWindow.webContents);
    mainWindow.loadURL(LOAD_URL);
  }

  onMessage() {
    onWindowDrag();
    onNotify(ICON_PATH);
    onExternalUrlOpen();
  }
}

function bingSetup(content: BrowserView["webContents"]) {
  // 跨域处理
  content.session.webRequest.onBeforeSendHeaders((details, callback) => {
    callback({
      requestHeaders: { Origin: "*", ...details.requestHeaders },
    });
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content.session.webRequest.onHeadersReceived((details: any, callback) => {
    if (details.responseHeaders["X-Frame-Options"]) {
      delete details.responseHeaders["X-Frame-Options"];
    } else if (details.responseHeaders["x-frame-options"]) {
      delete details.responseHeaders["x-frame-options"];
    }
    if (details.responseHeaders["Content-Security-Policy"]) {
      delete details.responseHeaders["Content-Security-Policy"];
    } else if (details.responseHeaders["content-security-policy"]) {
      delete details.responseHeaders["content-security-policy"];
    }
    if (details.responseHeaders["access-control-allow-origin"]) {
      delete details.responseHeaders["access-control-allow-origin"];
    } //这一句
    if (details.responseHeaders["access-control-allow-credentials"]) {
      delete details.responseHeaders["access-control-allow-credentials"];
    } //这一句
    callback({
      responseHeaders: {
        "Access-Control-Allow-Origin": ["*"],
        ...details.responseHeaders,
      },
    });
  });
}
