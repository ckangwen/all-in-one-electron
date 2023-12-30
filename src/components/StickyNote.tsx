import { cn } from "@/libs/utils";
import { Clickable } from "@revealing/electron/renderer";
import { useCallback, useMemo, useState } from "react";
import { Rnd, RndDragCallback, Props, RndResizeCallback } from "react-rnd";
import { X } from "lucide-react";
interface DraggableProps extends Props {
  title?: string;
  onClose?: () => void;
}

const defaultSize: NonNullable<Props["size"]> = {
  width: 300,
  height: 300,
};

const defaultPosition: NonNullable<Props["position"]> = {
  x: 200,
  y: 200,
};

export default function StickyNote({
  className,
  title,
  size = defaultSize,
  position = defaultPosition,
  onClose,
  children,
  ...props
}: DraggableProps) {
  const [controlledPosition, setControlledPosition] = useState(position);
  const [controlledSize, setControlledSize] = useState(size);

  const getDocumentDimensions = useCallback(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    };
  }, []);
  const getMaxPosition = useCallback(() => {
    const { width, height } = getDocumentDimensions();
    return {
      x: width - 40,
      y: height - 70,
    };
  }, [getDocumentDimensions]);

  // 标识是否到达了四个边缘
  const reachEdge = useMemo(() => {
    const documentHeight = document.documentElement.clientHeight;
    const documentWidth = document.documentElement.clientWidth;
    return {
      bottom:
        controlledPosition.y + Number(controlledSize.height) > documentHeight,
      right:
        controlledPosition.x + Number(controlledSize.width) > documentWidth,
      top: controlledPosition.y < 0,
      left: controlledPosition.x < 0,
      nearBottom:
        controlledPosition.y + Number(controlledSize.height) >
        documentHeight - 100,
    };
  }, [controlledPosition, controlledSize]);

  // 拖动结束后，更新位置坐标
  // 并且如果是靠近边缘的状态的话，则隐藏到边缘
  const onDragStop: RndDragCallback = useCallback(
    (_e, data) => {
      const { x, y } = data;
      let newX = x;
      let newY = y;
      const maxPosition = getMaxPosition();

      if (reachEdge.bottom) {
        newY = maxPosition.y;
      }
      if (reachEdge.right) {
        newX = maxPosition.x;
      }

      setControlledPosition({
        x: newX,
        y: newY,
      });
    },
    [getMaxPosition, reachEdge.bottom, reachEdge.right]
  );

  const onResize: RndResizeCallback = useCallback(
    (_e, _direction, ref, _delta, position) => {
      const maxPosition = getMaxPosition();

      const { width, height } = ref.style;
      setControlledSize({
        width,
        height,
      });

      setControlledPosition({
        x: Math.min(position.x, maxPosition.x),
        y: Math.min(position.y, maxPosition.y),
      });
    },
    [getMaxPosition]
  );

  // 如果卡片是在底部，则双击后使其完全显示
  // 如果是完全显示的状态，则双击后使其隐藏到底部
  const onDoubleClick = useCallback(() => {
    const maxPosition = getMaxPosition();

    if (reachEdge.bottom) {
      setControlledPosition({
        ...controlledPosition,
        y:
          document.documentElement.clientHeight -
          Number(controlledSize.height) -
          60,
      });
    } else {
      setControlledPosition({
        ...controlledPosition,
        y: maxPosition.y,
      });
    }
  }, [
    controlledPosition,
    controlledSize.height,
    getMaxPosition,
    reachEdge.bottom,
  ]);

  return (
    <Clickable>
      <Rnd
        className={cn(
          "rounded-xl border bg-card text-card-foreground shadow-md box-border text-sm hover:shadow-lg",
          reachEdge.nearBottom ? "transition-transform duration-200" : "",
          className
        )}
        onDragStop={onDragStop}
        onResize={onResize}
        position={controlledPosition}
        size={controlledSize}
        {...props}
      >
        {title && (
          <div
            className="flex justify-between items-center h-7 rounded-t-md font-bold cursor-pointer px-4"
            onDoubleClick={onDoubleClick}
          >
            <span>{title}</span>

            <X className="w-4 h-4" onClick={onClose} />
          </div>
        )}
        <div
          style={{
            height: title ? "calc(100% - 32px)" : "100%",
          }}
          className="w-full px-4 pb-2 box-border"
        >
          {children}
        </div>
      </Rnd>
    </Clickable>
  );
}
