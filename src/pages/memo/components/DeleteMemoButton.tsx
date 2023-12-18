import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { FindMemoType } from "@revealing/api/types";
import { useCallback } from "react";
import { trpcReact } from '@revealing/trpc/renderer';

interface DeleteMemoButtonProps {
  data: FindMemoType;
}
export default function DeleteMemoButton({ data }: DeleteMemoButtonProps) {
  const utils = trpcReact.useUtils();
  const deleteMutation = trpcReact.memo.delete.useMutation();
  const onConfirmDelete = useCallback(() => {
    if (data.id) {
      deleteMutation.mutate(data.id, {
        onSuccess() {
          utils.memo.invalidate()
        }
      })
    }
  }, [data.id, deleteMutation, utils.memo]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="h-7 text-xs rounded-sm"
          size="sm"
          variant="destructive"
        >
          删除
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>提示</AlertDialogTitle>
          <AlertDialogDescription>
            是否确认删除{data.title}?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirmDelete}>确定</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
