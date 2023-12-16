import { ipcRenderer } from "electron";
import { MEMO_CHANNELS } from "./types";

export function openMemoWindow() {
  ipcRenderer.send(MEMO_CHANNELS.OPEN);
}
