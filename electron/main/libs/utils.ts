import { INDEX_HTML_PATH } from "./filepath";

export const isProd = process.env.NODE_ENV === "production";

export const LOAD_URL = isProd ? `file://${INDEX_HTML_PATH}` : "http://localhost:3333";