import { Toaster } from "@/components/ui/toaster";
import Menubar from "./Menubar";
import URLSchemeActionHandler from "@/components/URLSchemeActionHandler";
import "./index.css";
import StickyTextarea from "@/components/StickyTextarea";

function Page() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Menubar />

      <StickyTextarea />
      <URLSchemeActionHandler />
      <Toaster />
    </div>
  );
}

export default Page;
