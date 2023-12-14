import { cn } from "@/libs/utils";
import { Pin, PinOff } from "lucide-react";
import { MouseEventHandler, useState } from "react";
import { Clickable } from "@revealing/electron/renderer";

const sideTipBaseCn = cn(
  "relative transition transition-transform duration-500",
  "min-h-20 w-[200px] px-3 pb-2 pt-4 box-border",
  "rounded-md shadow-md",
  "translate-x-[180px] hover:-translate-x-0"
);

function Sticky() {
  const [isSticky, setIsSticky] = useState(false);

  const onToggleSticky: MouseEventHandler = (e) => {
    e.stopPropagation();
    setIsSticky((prev) => !prev);
  }

  return (
    <Clickable className={cn(sideTipBaseCn, "bg-red-200")} style={{
      transform: isSticky ? "translateX(0)" : undefined
    }}>
      <div className="z-[2] w-full ">
        {
          isSticky ? (
            <PinOff onClick={onToggleSticky} className="absolute right-2 top-2 cursor-pointer" size={14} />
          ) : (
            <Pin onClick={onToggleSticky} className="absolute right-2 top-2 cursor-pointer" size={14} />
          )
        }
      </div>
      <div className="text-sm text-primary">View</div>
    </Clickable>
  )
}

export default function SideTips() {
  return (
    <div className="fixed top-0 right-0 py-6 flex flex-col gap-5">
      <Sticky></Sticky>
    </div>
  );
}
