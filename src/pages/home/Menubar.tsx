import {
  Clickable,
  openMemoWindow,
  openWeReadWindow,
} from "@revealing/electron/renderer";
import { cn } from "@/libs/utils";
import { BrainCircuit, CalendarCheck } from "lucide-react";
import { useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useSetStickyTextareaState } from "@/store/sticky-textarea";
import Tooltip from "@/components/Tooltip";
import { useSetDiaryState } from "@/store/diary";

export default function Menubar() {
  const onOpenMemoWindow = useCallback(() => {
    openMemoWindow();
  }, []);

  const { toast } = useToast();
  const setStickyTextareaVisible = useSetStickyTextareaState();

  const onClick = useCallback(() => {
    toast({
      title: "有一项任务需要完成！",
      description: "测试测试",
      action: (
        <ToastAction
          altText="Go"
          onClick={() => {
            setStickyTextareaVisible({
              visible: true,
              title: "测试",
            });
          }}
        >
          现在开始做
        </ToastAction>
      ),
    });
  }, [setStickyTextareaVisible, toast]);

  const onShowWeRead = useCallback(() => {
    openWeReadWindow();
  }, []);

  const setDailyNoteState = useSetDiaryState();
  const onOpenDailyNote = useCallback(() => {
    setDailyNoteState({ visible: true });
  }, [setDailyNoteState]);

  return (
    <Clickable
      className={cn([
        "relative  w-[700px] h-10 mx-auto",
        "-translate-y-7 hover:translate-y-0 transition-transform duration-200",
      ])}
    >
      <div className="flex items-center gap-4 w-full h-8 shadow-lg bg-white px-4 rounded-t-none rounded-b-md">
        <div
          className="bg-primary text-primary-foreground p-1 text-xs rounded-full cursor-pointer select-none hover:bg-primary/80"
          onClick={onOpenMemoWindow}
        >
          <BrainCircuit className="w-4 h-4" />
        </div>

        <Tooltip message="日记">
          <div
            className="bg-primary text-primary-foreground p-1 text-xs rounded-full cursor-pointer select-none hover:bg-primary/80"
            onClick={onOpenDailyNote}
          >
            <CalendarCheck className="w-4 h-4" />
          </div>
        </Tooltip>

        <div
          className="p-1 text-xs rounded-full cursor-pointer select-none"
          onClick={onShowWeRead}
        >
          <img
            className="w-4 h-4"
            src="https://rescdn.qqmail.com/node/wr/wrpage/style/images/independent/favicon/favicon_32h.png"
          />
        </div>
      </div>
    </Clickable>
  );
}
