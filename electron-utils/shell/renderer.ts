import { ipcRenderer } from 'electron';
import { ShellEvents } from './types';

export function openExternalUrl(url: string) {
  return ipcRenderer.send(ShellEvents.OPEN_EXTERNAL, url);
}