import { ipcRenderer } from "electron";
import { Events } from "./types";

export function notify(title: string, content: string) {
  ipcRenderer.send(Events.NOTIFY, {
    title,
    content,
  });
}
