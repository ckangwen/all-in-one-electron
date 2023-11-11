import { ipcMain, Notification } from "electron";
import { Events } from "./types";

export function onNotify(icon?: string) {
  ipcMain.on(Events.NOTIFY, (_e, { title, content }) => {
    new Notification({
      title,
      body: content,
      icon,
    }).show();
  });
}
