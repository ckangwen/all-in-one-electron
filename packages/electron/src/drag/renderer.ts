import { ipcRenderer } from "electron";
import { DRAG_CHANNELS, MoveWindowOptions } from "./types";
import type { MouseEventHandler } from "react";

export const IGNORE_DRAG_CLASS_NAME = "ignoreMove";

const checkDomIgnore = (
  dom: HTMLElement,
  igClassNames: string[],
  igTagNames: string[]
): boolean => {
  let has = igTagNames.includes(dom.tagName);

  if (has) return has;

  for (const name of dom.classList) {
    has = igClassNames.includes(name);

    if (has) break;
  }

  if (!has && dom.parentElement) {
    return checkDomIgnore(dom.parentElement, igClassNames, igTagNames);
  }

  return has;
};

export const createWindowDragHandler = (options?: MoveWindowOptions) => {
  const { igClassNames = [IGNORE_DRAG_CLASS_NAME], igTagNames = ["INPUT"] } =
    options || {};

  let animationId = 0;
  let dragging = false;

  const onMoveWindow = () => {
    if (!dragging) {
      cancelAnimationFrame(animationId);
      return;
    }

    ipcRenderer.send(DRAG_CHANNELS.DRAGGING);
    animationId = requestAnimationFrame(onMoveWindow);
  };

  const onMouseDown: MouseEventHandler<unknown> = (e) => {
    const dom = e.target as HTMLElement;
    if (checkDomIgnore(dom, igClassNames, igTagNames)) {
      return;
    }

    const [mouseX, mouseY] = [e.clientX, e.clientY];
    ipcRenderer.send(DRAG_CHANNELS.DRAG_START, { mouseX, mouseY });
    document.addEventListener("mouseup", onMouseUp);
    dragging = true;
    onMoveWindow();
  };

  const onMouseUp = () => {
    ipcRenderer.send(DRAG_CHANNELS.DRAG_OVER);
    dragging = false;
    document.removeEventListener("mouseup", onMouseUp);
    cancelAnimationFrame(animationId);
  };

  return {
    onMouseDown,
  };
};
