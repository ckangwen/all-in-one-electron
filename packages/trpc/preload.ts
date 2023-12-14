import { ipcRenderer } from "electron";
import { ELECTRON_TRPC_CHANNEL } from "electron-trpc/renderer";
import type { Operation } from "@trpc/client";
import type { TRPCResponseMessage } from "@trpc/server/rpc";

export type ETRPCRequest =
  | { method: "request"; operation: Operation }
  | { method: "subscription.stop"; id: number };

export interface RendererGlobalElectronTRPC {
  sendMessage: (args: ETRPCRequest) => void;
  onMessage: (callback: (args: TRPCResponseMessage) => void) => void;
}

export function exposeElectronTRPC() {
  const electronTRPC: RendererGlobalElectronTRPC = {
    sendMessage: (operation) =>
      ipcRenderer.send(ELECTRON_TRPC_CHANNEL, operation),
    onMessage: (callback) =>
      ipcRenderer.on(ELECTRON_TRPC_CHANNEL, (_event, args) => callback(args)),
  };

  (window as any).electronTRPC = electronTRPC;
}
