import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  user: any | null;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  setAuth: (data: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      hasHydrated: false,

      setHasHydrated: (state) => set({ hasHydrated: state }),

      setAuth: (data) =>
        set({ token: data.token, user: data.user }),

      logout: () => set({ token: null, user: null }),
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);