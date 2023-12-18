import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCallback, useState } from "react";

import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Orbit } from "lucide-react";
import { FindMemoType } from "@revealing/api/types";

const formSchema = z.object({
  title: z.string().min(1, { message: "请输入标题" }),
  type: z.string().min(1, { message: "请选择类型" }),
  raw: z.string().min(1, { message: "请输入内容" }),
  content: z.string(),
});

export type FormSchemaType = z.infer<typeof formSchema>;

interface MemoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data?: FindMemoType | null;
  onSuccess: (value: FormSchemaType & { id: number | undefined }) => void;
}

const MEMO_TYPES = ["text", "siyuan-sql"];

export default function MemoDialog(props: MemoDialogProps) {
  const { open, onOpenChange, data, onSuccess } = props;

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      type: MEMO_TYPES[0],
      raw: "",
      content: "",
    },
  });

  function onSubmit(values: FormSchemaType) {
    const content = values.raw;
    onSuccess({
      ...values,
      content,
      id: data?.id,
    });
    onOpenChange(false);
  }

  const onTypeChange = useCallback(
    (value: string) => {
      form.setValue("type", value);
    },
    [form]
  );

  const onFetchRaw = () => {
    console.log(form.getValues());
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{data ? "更新" : "新建"} Memo</DialogTitle>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入标题" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>类型</FormLabel>
                    <FormControl>
                      <Select {...field} onValueChange={onTypeChange}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="请选择类型" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {MEMO_TYPES.map((t) => (
                              <SelectItem key={t} value={t}>
                                {t}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="raw"
                render={({ field }) => (
                  <FormItem>
                    <div className="w-full h-5 flex justify-between items-center">
                      <FormLabel>内容</FormLabel>
                      {form.watch("type") === "siyuan-sql" && (
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={onFetchRaw}
                        >
                          <Orbit size={14} />
                        </Button>
                      )}
                    </div>
                    <FormControl>
                      <Textarea placeholder="请输入内容" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button type="submit">确定</Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
