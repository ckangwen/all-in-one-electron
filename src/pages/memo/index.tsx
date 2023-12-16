import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CreateMemo from "./CreateMemo";
import { useCallback, useState } from "react";
import { DialogProps } from "@radix-ui/react-alert-dialog";
export default function MainContent() {
  const [createMemoVisible, setCreateMemoVisible] = useState(false);
  const showVisible = useCallback(() => {
    setCreateMemoVisible(true);
  }, []);
  const hideVisible = useCallback(() => {
    setCreateMemoVisible(false);
  }, []);
  const onOpenChange: NonNullable<DialogProps["onOpenChange"]> = useCallback(
    (open) => {
      setCreateMemoVisible(open);
    },
    []
  );
  return (
    <div className="w-full p-4">
      <div className="w-full flex justify-end items-center mb-3">
        <Dialog open={createMemoVisible} onOpenChange={onOpenChange}>
          <DialogTrigger asChild>
            <Button size="sm" onClick={showVisible}>
              创建新的 Memo
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>创建新的 Memo</DialogTitle>
            </DialogHeader>
            <CreateMemo close={hideVisible} />
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[70px]">ID</TableHead>
            <TableHead className="w-[130px]">标题</TableHead>
            <TableHead>内容</TableHead>
            <TableHead className="w-[160px]">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>
              Credit Card Credit Card Credit Card Credit Card
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button className="h-7 text-xs rounded-sm" size="sm">
                  修改
                </Button>
                <Button
                  className="h-7 text-xs rounded-sm"
                  size="sm"
                  variant="destructive"
                >
                  删除
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
