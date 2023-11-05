import { screen, BrowserWindow } from "electron";
import { ICON_PATH } from "../libs/filepath";
import { LOAD_URL } from "../libs/utils";

export default function createSideTrigger() {
  let win: BrowserWindow | null = null;
  const createWindow = () => {
    const winWidth = 26;
    const winHeight = 60;
    const { x, y } = screen.getCursorScreenPoint();
    const currentDisplay = screen.getDisplayNearestPoint({ x, y });

    win = new BrowserWindow({
      x: currentDisplay.workArea.width - winWidth,
      icon: ICON_PATH,
      y: 100,
      title: "SideTrigger",
      type: "toolbar",
      width: winWidth,
      height: winHeight,
      resizable: false,
      movable: false,
      frame: false,
      // alwaysOnTop: true,
      fullscreenable: false,
      minimizable: false,
      maximizable: false,
      closable: false,
      skipTaskbar: true,
      transparent: true,
      autoHideMenuBar: true,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        webSecurity: false,
      },
    });

    win.loadURL(LOAD_URL + "#/side-trigger");
  };

  if (!win) {
    createWindow();
  }

  return win!;
}
