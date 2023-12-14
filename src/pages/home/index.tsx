import { Clickable } from "@revealing/electron/renderer";
import { Toaster } from "@/components/ui/toaster";
import Menubar from "./Menubar";
import SideTips from "./SideTips";
import "./index.css";

function Page() {

  return (
    <div className="relative w-screen h-screen">
      <Menubar />
      <SideTips />

      <Clickable>
        <Toaster />
      </Clickable>
    </div>
  );
}

export default Page;
