import { EnableMouseEvents } from "~electron-utils/window/renderer";
import { notify } from "~electron-utils/notification/renderer";
import "./index.css";

function Page() {
  const onNotify = () => {
    notify("提示", "这是一个通知")
  }
  return (
    <div className="w-full h-[200px]">
      <EnableMouseEvents className="flex items-center gap-2 bg-white h-7 shadow-lg rounded-t-none rounded-b-md main-menu-bar px-4">
        <a
          className="bg-primary text-primary-foreground px-3 py-[2px] text-xs rounded-sm cursor-pointer select-none hover:bg-primary/90"
          href="obsidian://open?vault=memo&file=HOME"
        >
          Memo
        </a>
        <span
          className="bg-primary text-primary-foreground px-3 py-[2px] text-xs rounded-sm cursor-pointer select-none hover:bg-primary/90"
          onClick={onNotify}
        >
          Notify
        </span>
      </EnableMouseEvents>
    </div>
  );
}

export default Page;
