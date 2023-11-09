import { app, BrowserWindow, screen } from "electron";
import { onNotify } from "../../electron-utils/notification/main"
import { ignoreMouseEvents } from "../../electron-utils/window/main"
import { ICON_PATH, PRELOAD_PATH } from "./libs/filepath";
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

    app.setAppUserModelId("Revealing")
  }

  onMessage() {
    onWindowDrag();
    onNotify(ICON_PATH);
  }

  createMainWindow() {
    const { x, y } = screen.getCursorScreenPoint();
    const currentDisplay = screen.getDisplayNearestPoint({ x, y });
    const sideGap = 200;

    const mainWindow = new BrowserWindow({
      title: "Revealing",
      icon: ICON_PATH,
      y: 0,
      x: sideGap,
      width: currentDisplay.workArea.width - sideGap * 2,
      transparent: true,
      alwaysOnTop: true,
      frame: false,
      webPreferences: {
        preload: PRELOAD_PATH,
        nodeIntegration: true,
        contextIsolation: false,
        webSecurity: false,
      },
    });
    this.mainBrowserWindow = mainWindow;
    ignoreMouseEvents(mainWindow);

    mainWindow.loadURL(LOAD_URL);
  }
}
