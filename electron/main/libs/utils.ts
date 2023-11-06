import { INDEX_HTML_PATH } from "./filepath";
import { app } from "electron";

export const LOAD_URL = app.isPackaged
  ? `file://${INDEX_HTML_PATH}`
  : "http://localhost:3333/";
