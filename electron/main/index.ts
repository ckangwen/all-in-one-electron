import { app, BrowserWindow } from "electron";
import { createIPCHandler } from "@revealing/trpc/main";
import {
  registerWindowMouseEvents,
  registerExternalUrlOpenEvent,
  registerUrlScheme,
  registerMemoWindowOpenEvent,
  createMainWindow,
  createMemoWindow,
} from "@revealing/electron/main";
import { appRouter } from "@revealing/api";

app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

let ipcHandler: ReturnType<typeof createIPCHandler>;

app.whenReady().then(() => {
  const { window: mainWindow } = createMainWindow();
  if (mainWindow) {
    ipcHandler = createIPCHandler({
      router: appRouter,
      windows: [mainWindow],
    });

    registerWindowMouseEvents(mainWindow);
    registerUrlScheme(mainWindow);
  }

  registerExternalUrlOpenEvent();
  registerMemoWindowOpenEvent(() => {
    const { window } = createMemoWindow();
    ipcHandler?.attachWindow(window);
  });
});


app.on("before-quit", () => {
  // 销毁所有 BrowserWindow 实例
  BrowserWindow.getAllWindows().forEach((window) => {
    window.destroy();
  });
});

app.on("window-all-closed", () => {
  app.quit();
});
