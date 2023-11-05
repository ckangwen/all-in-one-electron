import { Layers } from "lucide-react";

export default function Page() {
  return (
    <div className="inline-flex justify-center items-center w-full h-[50px] rounded-l-[4px] pr-0 bg-white hover:bg-slate2 overflow-hidden">
      <a className="cursor-pointer w-[16px] h-[16px]" href="obsidian://open?vault=memo&file=HOME">
        <Layers className="w-full h-full text-slate10  hover:text-slate12" />
      </a>
    </div>
  );
}
