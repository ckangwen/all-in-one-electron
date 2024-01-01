import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { ReactNode, useCallback, useState } from "react";
import { onOpenCommandChange } from "@revealing/electron/renderer";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CommandOptions {
  heading: string;
  children: Array<{
    label: string;
    value: string;
    icon?: ReactNode;
    shortcut?: string;
  }>;
}

export default function AppCommand() {
  const [open, setOpen] = useState(false);

  onOpenCommandChange(() => {
    setOpen(true);
  });

  const commandOptions: CommandOptions[] = [
    {
      heading: "最近使用",
      children: [
        {
          label: "Calendar",
          value: "calendar",
        },
      ],
    },
    {
      heading: "全部功能",
      children: [
        {
          label: "Mail",
          value: "mail",
        },
      ],
    },
  ];

  const onSelectItem = useCallback((value: string) => {
    console.log(value)
  }, [])

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <ScrollArea>
          {commandOptions.map((option, idx) => (
            <>
              <CommandGroup heading={option.heading} key={option.heading}>
                {option.children.map((child) => (
                  <CommandItem key={child.value} value={child.value} onSelect={onSelectItem}>
                    {child.icon}
                    <span>{child.label}</span>
                    {child.shortcut && (
                      <CommandShortcut>{child.shortcut}</CommandShortcut>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
              {idx === commandOptions.length - 1 ? null : <CommandSeparator key={option.heading} />}
            </>
          ))}
        </ScrollArea>
      </CommandList>
    </CommandDialog>
  );
}
