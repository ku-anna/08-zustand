// app/lib/stores/noteStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";

type NoteDraftStore = {
  draft: NewNoteData;
  setDraft: (note: NewNoteData) => void;
  clearDraft: () => void;
};
export type NewNoteData = {
  title: string;
  content: string;
  tag: string;
};

const initialDraft: NewNoteData = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      tag: initialDraft.tag,
      setDraft: (note) => set(() => ({ draft: note, tag: note.tag })),
      clearDraft: () =>
        set(() => ({ draft: initialDraft, tag: initialDraft.tag })),
    }),
    {
      name: "note-draft",

      partialize: (state) => ({ draft: state.draft }),
    }
  )
);
