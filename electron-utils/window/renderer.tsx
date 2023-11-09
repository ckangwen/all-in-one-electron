import * as React from "react";
import { ipcRenderer } from "electron";
import { WindowChannels } from "./types";

interface EnableMouseEvents extends React.HTMLAttributes<HTMLDivElement> {}

export const EnableMouseEvents = React.forwardRef<
  HTMLDivElement,
  EnableMouseEvents
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
