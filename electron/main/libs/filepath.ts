import { join } from "path";

// __dirname: xxx/dist-electron/main
const DIST_ELECTRON_PATH = join(__dirname, "../");
const DIST_PATH = join(DIST_ELECTRON_PATH, "../dist");

export const PUBLIC_PATH = process.env.VITE_DEV_SERVER_URL
  ? join(DIST_ELECTRON_PATH, '../public')
  : DIST_PATH;

export const ICON_PATH = join(PUBLIC_PATH, "./icons/icon.ico");
export const INDEX_HTML_PATH = join(DIST_PATH, "./index.html");