import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import DeleteMemoButton from "./components/DeleteMemoButton";
import MemoList from "./components/MemoList";
import MemoDialog from "./components/MemoDialog";
import { FindMemoType } from "@revealing/api/types";

import { trpcReact } from "@revealing/trpc/renderer";
import { FormSchemaType } from "./components/MemoDialog";

export default function MainContent() {
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FindMemoType | null>(null);

  const onStartCreateMemo = useCallback(() => {
    setVisible(true);
  }, []);

  const onStartUpdateMemo = useCallback((data: FindMemoType) => {
    setSelectedItem(data);
    setVisible(true);
  }, []);

  const utils = trpcReact.useUtils();
  const { data } = trpcReact.memo.list.useQuery();
  const createMutation = trpcReact.memo.create.useMutation();
  const updateMutation = trpcReact.memo.update.useMutation();

  const onSuccess = useCallback(
    (value: FormSchemaType & { id: number | undefined }) => {
      if (value.id) {
        updateMutation.mutate(
          {
            id: value.id,
            data: {
              title: value.title,
              type: value.type,
              raw: value.raw,
              content: value.content,
            },
          },
          {
            onSuccess() {
              utils.memo.invalidate();
            },
          }
        );
      } else {
        createMutation.mutate(
          {
            title: value.title,
            type: value.type,
            raw: value.raw,
            content: value.content,
          },
          {
            onSuccess() {
              utils.memo.invalidate();
            },
          }
        );
      }
    },
    [createMutation, utils.memo]
  );

  return (
    <div className="w-full p-4">
      <div className="w-full flex justify-end items-center mb-3">
        <Button size="sm" onClick={onStartCreateMemo}>
          创建新的 Memo
        </Button>
      </div>

      <MemoList
        data={data || []}
        actionRender={(item) => (
          <div className="flex gap-2">
            <Button
              className="h-7 text-xs rounded-sm"
              size="sm"
              onClick={() => onStartUpdateMemo(item)}
            >
              修改
            </Button>
            <DeleteMemoButton data={item}></DeleteMemoButton>
          </div>
        )}
      />

      <MemoDialog
        open={visible}
        onOpenChange={setVisible}
        data={selectedItem}
        onSuccess={onSuccess}
      />
    </div>
  );
}
