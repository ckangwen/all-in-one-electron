import { app, BrowserWindow, Tray } from "electron";
import { createIPCHandler } from "@revealing/trpc/main";
import {
  ignoreMouseEvents,
  onExternalUrlOpen,
  onWindowDrag,
  registerUrlScheme,
} from "@revealing/electron/main";
import { appRouter } from "@revealing/api";
import { ICON_PATH, PRELOAD_PATH } from "./libs/filepath";
import { getCurrentDisplay, LOAD_URL } from "./libs/utils";
import createTray from "./libs/createTray";

app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
let mainBrowserWindow: BrowserWindow | null = null;
let mainTray: Tray | null = null;
function createMainWindow() {
  const currentDisplay = getCurrentDisplay();

  mainBrowserWindow = new BrowserWindow({
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
  mainTray = createTray({
    menus: [
      {
        label: "Show Window",
        click: () => {
          mainBrowserWindow?.show();
        },
      },
      {
        label: "Hide Window",
        click: () => {
          mainBrowserWindow?.hide();
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

  createIPCHandler({
    router: appRouter,
    windows: [mainBrowserWindow],
  });

  mainBrowserWindow.loadURL(LOAD_URL);
}

onWindowDrag();
onExternalUrlOpen();

app.whenReady().then(() => {
  createMainWindow();
  if (mainBrowserWindow) {
    ignoreMouseEvents(mainBrowserWindow);
  }
});

registerUrlScheme(() => mainBrowserWindow);

app.on("window-all-closed", () => {
  mainBrowserWindow = null;
  mainTray?.destroy();
  app.quit();
});
app.on("before-quit", () => {
  mainTray?.destroy();
});

app.on("activate", () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createMainWindow();
  }
});
