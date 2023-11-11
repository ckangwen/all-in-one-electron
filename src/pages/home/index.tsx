import { Toaster } from "@/components/ui/toaster";
import { Clickable } from "~electron-utils/window/renderer";
import "./index.css";
import Menubar from "./Menubar";

function Page() {

  return (
    <div className="relative w-screen h-screen">
      <Menubar />

      <Clickable>
        <Toaster />
      </Clickable>
    </div>
  );
}

export default Page;
