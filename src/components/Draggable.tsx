import { useRef } from "react";
import useDraggable from "@/hooks/useDraggable";
import { Clickable } from "~electron-utils/window/renderer";

interface DraggableProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Draggable(props: DraggableProps) {
  const draggableRef = useRef<HTMLDivElement>(null);
  const [x, y] = useDraggable(draggableRef);
  return (
    <Clickable
      ref={draggableRef}
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
