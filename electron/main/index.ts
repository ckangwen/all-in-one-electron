import { app, BrowserWindow, Tray } from "electron";
import { createIPCHandler } from "@revealing/trpc/main";
import {
  ignoreMouseEvents,
  onExternalUrlOpen,
  registerUrlScheme,
  mainWindowDisableClick,
  listenMemoWindowOpen
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
let memoWin: BrowserWindow | null = null;
let mainTray: Tray | null = null;
let ipcHandler: ReturnType<typeof createIPCHandler>;
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

  ipcHandler = createIPCHandler({
    router: appRouter,
    windows: [mainBrowserWindow],
  });

  mainBrowserWindow.loadURL(LOAD_URL);
}

function createMemoWindow() {
  if (memoWin) {
    memoWin.show();
    return
  }

  memoWin = new BrowserWindow({
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

  ipcHandler?.attachWindow(memoWin);

  // 由于主窗口是在最上层的
  // 所以在 memo 窗口聚焦时
  // 为了可以点击到 memo 窗口，需要主窗口忽略鼠标事件
  memoWin.on("focus", () => {
    if (mainBrowserWindow) {
      mainWindowDisableClick(mainBrowserWindow)
    }
  })

  // 如果 memo 窗口失去焦点
  // 那么主窗口的应该忽略鼠标事件（默认状态）
  // 为了可以点击桌面的其他元素
  memoWin.on("blur", () => {
    if (mainBrowserWindow) {
      mainWindowDisableClick(mainBrowserWindow)
    }
  })

  memoWin.loadURL(`${LOAD_URL}#/memo`);

  return memoWin;
}

onExternalUrlOpen();

app.whenReady().then(() => {
  createMainWindow();
  if (mainBrowserWindow) {
    ignoreMouseEvents(mainBrowserWindow);
  }
});

listenMemoWindowOpen(() => {
  createMemoWindow();
})

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
