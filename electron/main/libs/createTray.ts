import { Menu, Tray } from "electron";
import { ICON_PATH } from "./filepath"
interface CreateTrayOptions {
  iconPath?: string;
  menus: Electron.MenuItemConstructorOptions[];
}


function createTray(options: CreateTrayOptions): Promise<Tray> {
  const { iconPath = ICON_PATH, menus } = options;
  return new Promise((resolve) => {
    const appIcon = new Tray(iconPath);

    const createContextMenu = () => {
      return Menu.buildFromTemplate(menus);
    };

    appIcon.on("click", () => {
      appIcon.setContextMenu(createContextMenu());
      appIcon.popUpContextMenu();
    });

    appIcon.setContextMenu(createContextMenu());

    resolve(appIcon);
  });
}

export default createTray;
