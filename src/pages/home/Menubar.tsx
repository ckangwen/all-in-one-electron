import { KeyboardEventHandler, useState } from "react";
import { Clickable } from "~electron-utils/window/renderer";
import { openExternalUrl } from "~electron-utils/shell/renderer";
import { StickyNote, FileJson } from "lucide-react";
import { cn } from "@/libs/utils";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Tooltip from "@/components/Tooltip";
function useGrepSearch() {
  const [grepSearchVisible, setGrepSearchVisible] = useState(false);
  const onOpenGrepSearch = () => {
    setGrepSearchVisible(true);
  };
  const onCloseGrepSearch = () => {
    setGrepSearchVisible(false);
  };
  const onConfirmGrepSearch: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key !== "Enter") {
      return;
    }
    const value = e.currentTarget.value.trim();

    const searchParams = new URLSearchParams({
      q: value,
    });
    const url = `https://grep.app/search?${searchParams.toString()}`;
    setGrepSearchVisible(false);
    openExternalUrl(url);
  };
  return {
    grepSearchVisible,
    onOpenGrepSearch,
    onCloseGrepSearch,
    onConfirmGrepSearch,
  };
}

export default function Menubar() {
  const {
    grepSearchVisible,
    onOpenGrepSearch,
    onCloseGrepSearch,
    onConfirmGrepSearch,
  } = useGrepSearch();

  return (
    <Clickable
      className={cn([
        "relative flex items-center gap-2 w-[700px] h-7 mx-auto",
        "bg-white shadow-lg rounded-t-none rounded-b-md px-4",
        "-translate-y-4 hover:translate-y-0 transition-transform duration-200",
      ])}
    >
      <Tooltip message="open memo">
        <a
          className="bg-primary text-primary-foreground p-1 text-xs rounded-full cursor-pointer select-none hover:bg-primary/80"
          href="obsidian://open?vault=memo&file=HOME"
        >
          <StickyNote className="w-4 h-4" />
        </a>
      </Tooltip>
      <Popover open={grepSearchVisible}>
        <PopoverTrigger onClick={onOpenGrepSearch}>
          <Tooltip message="search in grep.app">
            <div className="bg-primary text-primary-foreground p-1 text-xs rounded-full cursor-pointer select-none hover:bg-primary/80">
              <FileJson className="w-4 h-4" />
            </div>
          </Tooltip>
        </PopoverTrigger>
        <PopoverContent onPointerDownOutside={onCloseGrepSearch}>
          <Input
            className="w-full h-8"
            placeholder="请输入你要搜索的内容"
            onKeyDown={onConfirmGrepSearch}
            onBlur={onCloseGrepSearch}
          />
        </PopoverContent>
      </Popover>
    </Clickable>
  );
}
