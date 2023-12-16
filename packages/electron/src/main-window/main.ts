import { BrowserWindow, Menu, Tray, app } from "electron";
import { ICON_PATH, PRELOAD_PATH, LOAD_URL, getCurrentDisplay } from "../utils";

let mainBrowserWindow: BrowserWindow | undefined;
let mainTray: Tray | undefined;

function createMainTray(menus: Electron.MenuItemConstructorOptions[]) {
  const tray = new Tray(ICON_PATH);

  const createContextMenu = () => {
    return Menu.buildFromTemplate(menus);
  };

  tray.on("click", () => {
    tray.setContextMenu(createContextMenu());
    tray.popUpContextMenu();
  });

  tray.setContextMenu(createContextMenu());

  return tray;
}

export function createMainWindow() {
  const currentDisplay = getCurrentDisplay();

  if (!mainBrowserWindow) {
    mainBrowserWindow = new BrowserWindow({
      title: "Revealing",
      icon: ICON_PATH,
      // 占满整个屏幕
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
  }

  if (!mainTray) {
    mainTray = createMainTray([
      {
        label: "显示主窗口",
        click: () => {
          mainBrowserWindow?.show();
        },
      },
      {
        label: "隐藏主窗口",
        click: () => {
          mainBrowserWindow?.hide();
        },
      },
      { type: "separator" },
      {
        label: "退出",
        click: () => {
          app.exit();
        },
      },
    ]);
  }

  mainBrowserWindow.loadURL(LOAD_URL);

  app.on("before-quit", () => {
    mainTray?.destroy();
    mainBrowserWindow?.destroy();

    mainTray = undefined;
    mainBrowserWindow = undefined;
  });

  return {
    window: mainBrowserWindow,
    tray: mainTray,
  };
}

export function getMainWindow() {
  return mainBrowserWindow;
}

export function getMainTray() {
  return mainTray;
}
