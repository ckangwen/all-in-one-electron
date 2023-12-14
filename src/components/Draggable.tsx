import { useRef } from "react";
import useDraggable from "@/hooks/useDraggable";
import { Clickable } from "~electron-utils/window/renderer";
import { cn } from "@/libs/utils";

interface DraggableProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Draggable({ className, ...props}: DraggableProps) {
  const draggableRef = useRef<HTMLDivElement>(null);
  const [x, y] = useDraggable(draggableRef);
  return (
    <Clickable
      ref={draggableRef}
      className={cn("fixed", className)}
      style={{
        left: x + "px",
        top: y + "px",
      }}
      {...props}
    >
      {props.children}
    </Clickable>
  );
}
