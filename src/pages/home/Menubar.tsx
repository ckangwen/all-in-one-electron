import { Clickable, openMemoWindow } from "@revealing/electron/renderer";
import { cn } from "@/libs/utils";
import Setting from "./Setting";
import { BrainCircuit } from "lucide-react";
import { useCallback } from "react";
export default function Menubar() {
  const onOpenMemoWindow = useCallback(() => {
    openMemoWindow();
  }, []);

  return (
    <Clickable
      className={cn([
        "relative   w-[700px] h-10 mx-auto",
        "-translate-y-7 hover:translate-y-0 transition-transform duration-200",
      ])}
    >
      <Clickable className="flex items-center w-full h-8 shadow-lg bg-white px-4 rounded-t-none rounded-b-md">
        <Setting />
        <div
          className="bg-primary text-primary-foreground p-1 text-xs rounded-full cursor-pointer select-none hover:bg-primary/80"
          onClick={onOpenMemoWindow}
        >
          <BrainCircuit className="w-4 h-4" />
        </div>
      </Clickable>
    </Clickable>
  );
}
