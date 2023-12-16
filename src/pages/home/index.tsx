import { onUrlSchemeChange } from "@revealing/electron/renderer";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import Menubar from "./Menubar";
import "./index.css";


function Page() {
  const { toast } = useToast()
  onUrlSchemeChange(url => {
    toast({
      title: "Open URL Scheme",
      description: url,
    })
  })

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Menubar />

        <Toaster />
    </div>
  );
}

export default Page;
