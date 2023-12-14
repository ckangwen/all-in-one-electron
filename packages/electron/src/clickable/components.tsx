import { ipcRenderer } from "electron";
import {
  forwardRef,
  type HTMLAttributes,
  type MouseEventHandler,
  type ElementType,
} from "react";
import { CLICKABLE_CHANNELS } from "./types";

interface ClickableProps extends HTMLAttributes<HTMLDivElement> {
  component?: ElementType;
}

export const Clickable = forwardRef<HTMLDivElement, ClickableProps>(
  (props, ref) => {
    const Component = props.component ?? "div";
    // 当鼠标进入时，设置 ignoreMouseEvents 为 false，不会触发点击穿透
    const onMouseEnter: MouseEventHandler<HTMLDivElement> = (e) => {
      ipcRenderer.send(CLICKABLE_CHANNELS.SET_IGNORE_MOUSE_EVENTS, false);
      props.onMouseEnter?.(e);
    };

    // 当鼠标离开时，设置 ignoreMouseEvents 为 true，会触发点击穿透，但是能够接收到鼠标悬浮事件
    const onMouseLeave: MouseEventHandler<HTMLDivElement> = (e) => {
      ipcRenderer.send(CLICKABLE_CHANNELS.SET_IGNORE_MOUSE_EVENTS, true, {
        forward: true,
      });
      props.onMouseLeave?.(e);
    };

    return (
      <Component
        ref={ref}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        {...props}
      >
        {props.children}
      </Component>
    );
  }
);
