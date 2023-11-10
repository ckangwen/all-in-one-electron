import { Toaster } from "@/components/ui/toaster";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Clickable } from "~electron-utils/window/renderer";
import { notify } from "~electron-utils/notification/renderer";
import { createWindowDragHandler } from "~electron-utils/drag/renderer";
import Draggable from "@/components/Draggable";
import "./index.css";

function Page() {
  const { toast } = useToast();
  const { onMouseDown } = createWindowDragHandler();

  const onNotify = () => {
    notify("提示", "这是一个通知");
  };

  const onToggleVisible = () => {
    toast({
      title: "Scheduled: Catch up ",
      description: "Friday, February 10, 2023 at 5:57 PM",
      action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
    });
  };

  return (
    <div className="relative w-screen h-screen">
      <Clickable
        className="w-[700px] h-7 mx-auto flex items-center gap-2 bg-white shadow-lg rounded-t-none rounded-b-md main-menu-bar px-4"
        onMouseDown={onMouseDown}
      >
        <a
          className="bg-primary text-primary-foreground px-3 py-[2px] text-xs rounded-sm cursor-pointer select-none hover:bg-primary/90"
          href="obsidian://open?vault=memo&file=HOME"
        >
          Memo
        </a>
        <span
          className="bg-primary text-primary-foreground px-3 py-[2px] text-xs rounded-sm cursor-pointer select-none hover:bg-primary/90"
          onClick={onNotify}
        >
          Notify
        </span>
        <span
          className="bg-primary text-primary-foreground px-3 py-[2px] text-xs rounded-sm cursor-pointer select-none hover:bg-primary/90"
          onClick={onToggleVisible}
        >
          toggle
        </span>
      </Clickable>

      <Draggable
        className="absolute w-[100px] h-[100px] bg-white flex justify-center items-end text-slate10"
      >
        你好世界
      </Draggable>

      <Clickable>
        <Toaster />
      </Clickable>
    </div>
  );
}

export default Page;
