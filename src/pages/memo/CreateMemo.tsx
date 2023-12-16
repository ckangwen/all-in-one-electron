import { useCallback } from "react";

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

const formSchema = z.object({
  title: z.string(),
  type: z.string(),
  raw: z.string(),
  content: z.string(),
});

interface CreateMemoProps {
  close: () => void;
}

export default function CreateMemo({ close }: CreateMemoProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      type: "",
      raw: "",
      content: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    close()
  }

  const onTypeChange = useCallback((value: string) => {
    form.setValue("type", value);
  }, [form]);
  const onFetchRaw = () => {
    console.log(form.getValues());
  };

  return (
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
                      <SelectItem value="text">text</SelectItem>
                      <SelectItem value="siyuan-sql">siyuan-sql</SelectItem>
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
                  <Button size="icon" variant="ghost" onClick={onFetchRaw}>
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
  );
}
