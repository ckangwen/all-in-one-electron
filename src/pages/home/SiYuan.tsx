import { MouseEventHandler, useCallback, useState } from "react";
import { trpcReact } from "@revealing/trpc/renderer";
import { Clickable } from "@revealing/electron/renderer";
import { motion } from "framer-motion";
import { X, RefreshCw } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";
import Markdown from "@/components/Markdown";
import { cn } from "@/libs/utils";

const variants = {
  open: {
    width: "80vw",
    height: "70vh",
  },
  closed: {
    width: "200px",
    height: "50px",
  },
};

export default function SiYuan() {
  const utils = trpcReact.useUtils();
  const { data } = trpcReact.siyuan.randomTodo.useQuery();
  const [isExpanded, setIsExpanded] = useState(false);

  const onToggleExpand = useCallback(() => {
    if (!data?.content) {
      return;
    }

    setIsExpanded((prev) => !prev);
  }, [data]);

  const onRefresh: MouseEventHandler = useCallback((e) => {
    e.stopPropagation();

    utils.siyuan.randomTodo.invalidate();
  }, [utils])

  return (
    <Clickable>
      <motion.div
        layout
        className={cn(
          "fixed right-[30px] bottom-[40px] flex py-4 px-6 box-border group rounded-md cursor-pointer",
          isExpanded ? "bg-slate-200 shadow-lg" : "bg-slate-100 shadow-md"
        )}
        animate={isExpanded ? "open" : "closed"}
        variants={variants}
        onClick={onToggleExpand}
      >
        <div className="h-full box-border hidden group-hover:flex gap-2 absolute right-2 top-1 text-slate-400">
          {
            (isExpanded && data?.id) && (
              <a href={`siyuan://blocks/${data.id}`}>在思源中打开</a>
            )
          }
          <div className="h-full flex flex-col gap-2 items-center">
            <X size={16} />
            <RefreshCw size={16} onClick={onRefresh} />
          </div>
        </div>
        {isExpanded ? (
          <ScrollArea>
            <Markdown content={data?.content || ""} />
          </ScrollArea>
        ) : (
          <div>{data?.title}</div>
        )}
      </motion.div>
    </Clickable>
  );
}
