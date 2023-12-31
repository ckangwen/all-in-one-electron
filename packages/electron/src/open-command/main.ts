import { BrowserWindow, app, globalShortcut } from "electron";
import { APP_CHANNELS } from "../channels";

const COMMAND_SHORTCUT = "Alt+Space";

export function registerOpenCommandShortcut(defaultWindow: BrowserWindow) {
  if (globalShortcut.isRegistered(COMMAND_SHORTCUT)) {
    return;
  }

  globalShortcut.register(COMMAND_SHORTCUT, () => {
    defaultWindow.webContents.focus();
    defaultWindow.webContents.send(APP_CHANNELS.OPEN_COMMAND);
  });

  app.on("will-quit", () => {
    globalShortcut.unregister(COMMAND_SHORTCUT);
  });
}
