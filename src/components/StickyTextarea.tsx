import { useCallback } from "react";
import StickyNote from "./StickyNote";
import { Textarea } from "./ui/textarea";
import { useSetStickyTextareaState, useStickyTextareaState } from "@/store/sticky-textarea";

export default function StickyTextarea() {
  const stickyTextareaState = useStickyTextareaState();
  const setStickyTextareaState = useSetStickyTextareaState();
  const onClose = useCallback(() => {
    setStickyTextareaState({
      visible: false,
      title: "",
    })
  }, [setStickyTextareaState]);

  return (
    stickyTextareaState.visible && (
      <StickyNote title={stickyTextareaState.title} onClose={onClose}>
        <Textarea className="w-full h-full" placeholder="请输入内容" />
      </StickyNote>
    )
  );
}
