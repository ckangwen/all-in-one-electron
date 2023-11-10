import { INDEX_HTML_PATH } from "./filepath";
import { app, screen } from "electron";

export const LOAD_URL = app.isPackaged
  ? `file://${INDEX_HTML_PATH}`
  : "http://localhost:3333/";

export function getCurrentDisplay() {
  const { x, y } = screen.getCursorScreenPoint();
  const currentDisplay = screen.getDisplayNearestPoint({ x, y });

  return currentDisplay;
}
