import { Toaster } from "@/components/ui/toaster";
import Menubar from "./Menubar";
import URLSchemeActionHandler from "@/components/URLSchemeActionHandler";
import "./index.css";
import StickyTextarea from "@/components/StickyTextarea";
import AppCommand from "./Command";

function Page() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Menubar />

      <AppCommand />
      <StickyTextarea />
      <URLSchemeActionHandler />
      <Toaster />
    </div>
  );
}

export default Page;
