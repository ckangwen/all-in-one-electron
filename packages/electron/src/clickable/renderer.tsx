import { ipcRenderer } from "electron";
import { forwardRef, type HTMLAttributes, type MouseEventHandler } from "react";
import { CLICKABLE_CHANNELS } from "./types";

interface ClickableProps extends HTMLAttributes<HTMLDivElement> {}

export const Clickable = forwardRef<HTMLDivElement, ClickableProps>(
  (props, ref) => {
    const onMouseEnter: MouseEventHandler<HTMLDivElement> = (e) => {
      ipcRenderer.send(CLICKABLE_CHANNELS.SET_IGNORE_MOUSE_EVENTS, false);
      props.onMouseEnter?.(e);
    };
    const onMouseLeave: MouseEventHandler<HTMLDivElement> = (e) => {
      ipcRenderer.send(CLICKABLE_CHANNELS.SET_IGNORE_MOUSE_EVENTS, true, {
        forward: true,
      });
      props.onMouseLeave?.(e);
    };

    return (
      <div
        ref={ref}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        {...props}
      >
        {props.children}
      </div>
    );
  }
);
