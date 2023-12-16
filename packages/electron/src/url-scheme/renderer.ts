import { ipcRenderer } from "electron";
import { URL_SCHEME_CHANNELS } from "./types";

export function onUrlSchemeChange(listener: (url: string) => void) {
  ipcRenderer.on(URL_SCHEME_CHANNELS.OPEN_URL, (_e, url) => {
    listener(url);
  });
}
