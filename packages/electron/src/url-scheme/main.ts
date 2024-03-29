import path from "path";
import { BrowserWindow, app } from "electron";
import { URL_SCHEME_CHANNELS } from "./types";

const PROTOCOL = "revealing";
export function registerUrlScheme(mainWindow: BrowserWindow) {
  app.on("ready", () => {
    if (!app.isPackaged && process.platform === "win32") {
      app.removeAsDefaultProtocolClient(PROTOCOL, process.execPath, [
        path.resolve(process.argv[1]),
      ]);
    } else {
      app.removeAsDefaultProtocolClient(PROTOCOL);
    }

    if (!app.isPackaged && process.platform === "win32") {
      app.setAsDefaultProtocolClient(PROTOCOL, process.execPath, [
        path.resolve(process.argv[1]),
      ]);
    } else {
      app.setAsDefaultProtocolClient(PROTOCOL);
    }
  });

  // 当点击自定义 url scheme 时，会触发 second-instance 事件
  app.on("second-instance", (_e, commandLine) => {
    const url = commandLine.pop();
    if (url) {
      handleCustomUrl(url, mainWindow);
    }
  });
}

function handleCustomUrl(url: string, defaultWindow: BrowserWindow | null) {
  if (!defaultWindow) return;

  const prefix = `${PROTOCOL}://`;
  if (url.startsWith(prefix)) {
    const mainUrl = url.slice(prefix.length);
    defaultWindow.webContents.send(URL_SCHEME_CHANNELS.OPEN_URL, mainUrl);
  }
}
