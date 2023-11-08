import { app, BrowserWindow } from "electron";
import { onNotify } from "../../electron-utils/notification/main"
import { ICON_PATH } from "./libs/filepath";
import createTray from "./libs/createTray";
import createSideTrigger from "./features/side-trigger";
import { LOAD_URL } from "./libs/utils";
import { onWindowDrag } from "electron-drag-window/electron"

export default class App {
  mainBrowserWindow: BrowserWindow | null = null;

  constructor() {
    this.beforeReady();
    this.onMessage();

    app.whenReady().then(() => {
      this.createMainWindow();
      const sideTriggerWin = createSideTrigger();

      createTray({
        menus: [
          {
            label: "显示 Side Trigger",
            click: () => {
              sideTriggerWin.show();
            },
          },
          {
            label: "隐藏 Side Trigger",
            click: () => {
              sideTriggerWin.hide();
            },
          },
          { type: "separator" },
          {
            label: "退出",
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

    // app.on("second-instance", () => {
    //   if (!this.mainBrowserWindow) return;

    //   if (this.mainBrowserWindow.isMinimized()) {
    //     this.mainBrowserWindow.restore();
    //   }

    //   this.mainBrowserWindow.focus();
    // });
  }

  onMessage() {
    onWindowDrag();
    onNotify();
  }

  createMainWindow() {
    const mainWindow = new BrowserWindow({
      title: "All in one Electron",
      icon: ICON_PATH,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        webSecurity: false,
      },
    });
    this.mainBrowserWindow = mainWindow;

    mainWindow.loadURL(LOAD_URL);
  }
}
