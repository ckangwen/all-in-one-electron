import { Settings2 } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Setting() {

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="bg-primary text-primary-foreground p-1 text-xs rounded-full cursor-pointer select-none hover:bg-primary/80">
          <Settings2 className="w-4 h-4" />
        </div>
      </SheetTrigger>
      <SheetContent>
        <div className="mt-3">Hello World</div>
      </SheetContent>
    </Sheet>
  );
}
