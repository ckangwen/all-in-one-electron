import { FindMemoType } from "@revealing/api/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface MemoListProps {
  data: FindMemoType[];
  actionRender?: (data: FindMemoType) => React.ReactNode;
}
export default function MemoList({ data, actionRender }: MemoListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[70px]">ID</TableHead>
          <TableHead className="w-[130px]">标题</TableHead>
          <TableHead className="w-[70px]">类型</TableHead>
          <TableHead>内容</TableHead>
          <TableHead className="w-[160px]">操作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data && data.length ? (
          data.map((item) => {
            return (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.content}</TableCell>
                <TableCell>
                  {actionRender?.(item)}
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <div>暂无数据</div>
        )}
      </TableBody>
    </Table>
  );
}
