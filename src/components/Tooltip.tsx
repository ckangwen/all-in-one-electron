import { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
interface TooltipProps {
  message: string;
  children: ReactNode;
}
export default function CustomTooltip(props: TooltipProps) {
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>{props.children}</TooltipTrigger>
        <TooltipContent>
          <p>{props.message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
