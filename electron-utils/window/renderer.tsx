import * as React from "react";
import { ipcRenderer } from "electron";
import { WindowChannels } from "./types";

interface ClickableProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Clickable = React.forwardRef<
  HTMLDivElement,
  ClickableProps
>((props, ref) => {
  const onMouseEnter: React.MouseEventHandler<HTMLDivElement> = (e) => {
    ipcRenderer.send(WindowChannels.SET_IGNORE_MOUSE_EVENTS, false);
    props.onMouseEnter?.(e);
  };
  const onMouseLeave: React.MouseEventHandler<HTMLDivElement> = (e) => {
    ipcRenderer.send(WindowChannels.SET_IGNORE_MOUSE_EVENTS, true, {
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
});
