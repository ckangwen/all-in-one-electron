import { ipcMain } from "electron";
import { MEMO_CHANNELS } from "./types";

export function listenMemoWindowOpen(listener: () => void) {
  ipcMain.on(MEMO_CHANNELS.OPEN, () => {
    listener();
  });
}
