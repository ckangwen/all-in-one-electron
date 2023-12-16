import { join } from "path";
import { app, screen } from "electron";

// __dirname: xxx/dist-electron/main
const DIST_ELECTRON_PATH = join(__dirname, "../");
export const PRELOAD_PATH = join(DIST_ELECTRON_PATH, "./preload/index.js");
const DIST_PATH = join(DIST_ELECTRON_PATH, "../dist");

export const PUBLIC_PATH = process.env.VITE_DEV_SERVER_URL
  ? join(DIST_ELECTRON_PATH, "../public")
  : DIST_PATH;

export const ICON_PATH = join(PUBLIC_PATH, "./icons/icon.ico");
export const INDEX_HTML_PATH = join(DIST_PATH, "./index.html");

export const LOAD_URL = app.isPackaged
  ? `file://${INDEX_HTML_PATH}`
  : "http://localhost:3333/";

export function getCurrentDisplay() {
  const { x, y } = screen.getCursorScreenPoint();
  const currentDisplay = screen.getDisplayNearestPoint({ x, y });

  return currentDisplay;
}
