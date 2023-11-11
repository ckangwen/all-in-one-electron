import { Clickable } from "~electron-utils/window/renderer";
import { StickyNote } from "lucide-react";
import { cn } from "@/libs/utils";

export default function Menubar() {
  return (
    <Clickable
      className={cn([
        "relative flex items-center gap-2 w-[700px] h-7 mx-auto",
        "bg-white shadow-lg rounded-t-none rounded-b-md px-4",
        "-translate-y-4 hover:translate-y-0 transition-transform duration-200",
      ])}
    >
      <a
        className="bg-primary text-primary-foreground p-1 text-xs rounded-full cursor-pointer select-none hover:bg-primary/80"
        href="obsidian://open?vault=memo&file=HOME"
      >
        <StickyNote className="w-4 h-4" />
      </a>
    </Clickable>
  );
}
