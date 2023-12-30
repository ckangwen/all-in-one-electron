import { onUrlSchemeChange } from "@revealing/electron/renderer";
import { useToast } from "@/components/ui/use-toast";
import { trpcReact } from "@revealing/trpc/renderer";

export default function URLSchemeActionHandler() {
  const { toast } = useToast();
  const utils = trpcReact.useUtils();

  onUrlSchemeChange(async (url: string) => {
    if (url.startsWith("memo")) {
      const id = url.split("/")[1];
      if (!id) {
        return;
      }

      const memoData = await utils.client.memo.findById.query(Number(id));
      if (memoData) {
        toast({
          title: memoData.title!,
          description: memoData.content!,
        });
      }
    }
  });

  return <></>;
}
