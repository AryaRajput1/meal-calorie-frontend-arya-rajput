import { create } from "zustand";

export const useMealStore = create((set) => ({
  result: null,
  history: [],
  setResult: (data: any) =>
    set((state: any) => ({
      result: data,
      history: [data, ...state.history],
    })),
}));