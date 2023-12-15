import { Clickable } from "@revealing/electron/renderer";
import { Toaster } from "@/components/ui/toaster";
import Menubar from "./Menubar";
import SideTips from "./SideTips";
import "./index.css";
import StickyNote from "@/components/StickyNote";

function Page() {

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Menubar />
      <SideTips />

      <StickyNote></StickyNote>

      <Clickable>
        <Toaster />
      </Clickable>
    </div>
  );
}

export default Page;
