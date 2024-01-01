import { atom, useAtomValue, useSetAtom } from "jotai";

interface DailyNoteState {
  visible: boolean;
}

const dailyNoteStateAtom = atom<DailyNoteState>({
  visible: false,
});

export function useDiaryState() {
  return useAtomValue(dailyNoteStateAtom);
}

export function useSetDiaryState() {
  const setState = useSetAtom(dailyNoteStateAtom);

  return (value: DailyNoteState) => {
    setState(value);
  };
}
