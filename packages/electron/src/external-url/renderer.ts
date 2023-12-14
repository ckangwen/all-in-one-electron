import { ipcRenderer } from "electron";
import { EXTERNAL_URL_CHANNELS } from "./types";

export function openExternalUrl(url: string) {
  return ipcRenderer.send(EXTERNAL_URL_CHANNELS.OPEN_URL, url);
}
