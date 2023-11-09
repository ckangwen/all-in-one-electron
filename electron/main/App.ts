import { app, BrowserWindow, screen } from "electron";
import { onNotify } from "../../electron-utils/notification/main";
import { ignoreMouseEvents } from "../../electron-utils/window/main";
import { ICON_PATH, PRELOAD_PATH } from "./libs/filepath";
import createTray from "./libs/createTray";
import { LOAD_URL } from "./libs/utils";
import { onWindowDrag } from "electron-drag-window/electron";

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
    mainWindow.loadURL(LOAD_URL);
  }

  onMessage() {
    onWindowDrag();
    onNotify(ICON_PATH);
  }
}
