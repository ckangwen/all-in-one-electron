import { atom, useAtomValue, useSetAtom } from "jotai";

interface StickyTextareaState {
  visible: boolean;
  title: string;
}
export const stickyTextareaStateAtom = atom<StickyTextareaState>({
  visible: false,
  title: "",
});

export function useStickyTextareaState() {
  return useAtomValue(stickyTextareaStateAtom);
}

export function useSetStickyTextareaState() {
  const setState = useSetAtom(stickyTextareaStateAtom);

  return (value: StickyTextareaState) => {
    setState(value);
  };
}
