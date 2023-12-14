import { Clickable } from "@revealing/electron/renderer";
import { cn } from "@/libs/utils";
import Setting from "./Setting"

export default function Menubar() {
  return (
    <Clickable
      className={cn([
        "relative   w-[700px] h-10 mx-auto",
        "-translate-y-7 hover:translate-y-0 transition-transform duration-200",
      ])}
    >
      <Clickable className="flex items-center w-full h-8 shadow-lg bg-white px-4 rounded-t-none rounded-b-md">
        <Setting />
      </Clickable>
    </Clickable>
  );
}
