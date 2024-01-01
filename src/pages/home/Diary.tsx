import { ChangeEventHandler, useCallback, useEffect, useState } from "react";
import { trpcReact } from "@revealing/trpc/renderer";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { useDiaryState, useSetDiaryState } from "@/store/diary";

export default function Diary() {
  const { data, isLoading } = trpcReact.dida.findDiary.useQuery();
  const updateMutation = trpcReact.dida.updateDiary.useMutation();
  const [content, setContent] = useState(data?.content || "");

  // 将日记内容同步到本地
  useEffect(() => {
    if (data && !isLoading) {
      setContent(data.content);
    }
  }, [data, isLoading]);

  const { visible } = useDiaryState();
  const setState = useSetDiaryState();
  const onOpenChange = useCallback(
    (open: boolean) => {
      setState({ visible: open });
      // 如果关闭了弹窗，则更新日记内容
      if (!open && data?.content !== content) {
        updateMutation.mutate(content);
      }
    },
    [setState, data?.content, content, updateMutation]
  );

  const onContentChange: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => {
      const value = e.target.value;
      setContent(value);
    },
    []
  );

  return (
    <Sheet open={visible} onOpenChange={onOpenChange}>
      <SheetContent>
        <div className="mt-3 flex flex-col h-full">
          <SheetHeader className="mb-2 font-bold">日记</SheetHeader>

          <Textarea
            className="flex-1"
            value={content}
            onChange={onContentChange}
          ></Textarea>
        </div>
      </SheetContent>
    </Sheet>
  );
}
