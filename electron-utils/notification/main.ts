import { ipcMain, Notification } from "electron";
import { Events } from "./types";

export function onNotify() {
  ipcMain.on(Events.NOTIFY, (event, { title, content }) => {
    new Notification({
      title,
      body: content,
    }).show();
  });
}
