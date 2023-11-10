import { RefObject, useEffect, useState } from "react";
import { useEventListener } from "@react-hookz/web"
import { hasOwnProperty } from "@/libs/utils";


export interface Position {
  x: number;
  y: number;
}

export interface UseDraggableOptions {
  initialValue?: Position;
  onStart?: (position: Position, event: PointerEvent) => void | false;
  onMove?: (position: Position, event: PointerEvent) => void;
  onEnd?: (position: Position, event: PointerEvent) => void;
}

export default function useDraggable<T extends EventTarget>(
  target: RefObject<T> | T | null,
  options: UseDraggableOptions = {},
): readonly [number, number, boolean] {
  const [position, setPosition] = useState<Position>(options.initialValue ?? { x: 0, y: 0 });
  const [pressedDelta, setPressedDelta] = useState<Position>();

  useEffect(() => {
    setPosition(options.initialValue ?? { x: 0, y: 0 });
  }, [options.initialValue]);



  const start = (e: PointerEvent) => {
    const element = (target && hasOwnProperty(target, 'current') ? (target as RefObject<T>).current : target) as unknown as HTMLElement;
    const rect = element.getBoundingClientRect();
    const pos = {
      x: Math.max(0, e.pageX - rect.left),
      y: Math.max(0, e.pageY - rect.top),
    };

    if (options.onStart?.(pos, e) === false) {
      return;
    }

    setPressedDelta(pos);
  };

  const move = (e: PointerEvent) => {
    if (!pressedDelta) {
      return;
    }

    setPosition({
      x: Math.max(0, e.pageX - pressedDelta.x),
      y: Math.max(0,e.pageY - pressedDelta.y),
    });
    options.onMove?.(position, e);
  };

  const end = (e: PointerEvent) => {
    if (!pressedDelta) {
      return;
    }

    setPressedDelta(undefined);
    options.onEnd?.(position, e);
  };

  useEventListener(target, "mousedown", start, true);
  useEventListener(target, "mousemove", move, true);
  useEventListener(target, "mouseup", end, true);

  return [position.x, position.y, !!pressedDelta] as const;
}