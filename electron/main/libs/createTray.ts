import { Menu, Tray } from "electron";
import { ICON_PATH } from "./filepath";
interface CreateTrayOptions {
  iconPath?: string;
  menus: Electron.MenuItemConstructorOptions[];
}

function createTray(options: CreateTrayOptions): Tray {
  const { iconPath = ICON_PATH, menus } = options;
  const appIcon = new Tray(iconPath);

  const createContextMenu = () => {
    return Menu.buildFromTemplate(menus);
  };

  appIcon.on("click", () => {
    appIcon.setContextMenu(createContextMenu());
    appIcon.popUpContextMenu();
  });

  appIcon.setContextMenu(createContextMenu());

  return appIcon;
}

export default createTray;
