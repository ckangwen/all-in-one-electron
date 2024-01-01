import { trpcReact } from "@revealing/trpc/renderer"
import { Toaster } from "@/components/ui/toaster";
import Menubar from "./Menubar";
import URLSchemeActionHandler from "@/components/URLSchemeActionHandler";
import StickyTextarea from "@/components/StickyTextarea";
import AppCommand from "./Command";
import SiYuan from "./SiYuan"
import Diary from "./Diary";
import "./index.css";

function Page() {
  // 创建今天的日记
  trpcReact.dida.findOrCreateDiary.useQuery();

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Menubar />

      <Diary />
      <SiYuan />
      <AppCommand />
      <StickyTextarea />
      <URLSchemeActionHandler />
      <Toaster />
    </div>
  );
}

export default Page;
