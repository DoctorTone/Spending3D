import { create } from "zustand";
import type { ScreenSize } from "./Config";

export const CATEGORIES = [
  "Groceries",
  "Coffee",
  "Petrol",
  "Lunch",
  "Garden",
  "DIY",
  "Consumables",
  "Clothes",
  "Bills",
  "Misc",
] as const;
export type Category = (typeof CATEGORIES)[number] | "";

export type SpendingEntry = {
  date: string;
  description: string;
  amount: number;
  category: Category;
};

type FrameworkState = {
  screenSize: ScreenSize;
  setScreenSize: (size: ScreenSize) => void;
  infoDialogOpen: boolean;
  setShowInfoDialog: (status: boolean) => void;
  dataDialogOpen: boolean;
  setShowDataDialog: (status: boolean) => void;
  spendingData: SpendingEntry[];
  setSpendingData: (data: SpendingEntry[]) => void;
  updateSpendingEntry: (index: number, updates: Partial<SpendingEntry>) => void;
  categoryTotals: Partial<Record<Category, number>>;
  setCategoryTotals: (totals: Partial<Record<Category, number>>) => void;
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
  floorColor: string;
  setFloorColor: (color: string) => void;
};

const useStore = create<FrameworkState>((set) => ({
  screenSize: { width: window.innerWidth, height: window.innerHeight },
  setScreenSize: (size) =>
    set((state) => ({ screenSize: { ...state.screenSize, ...size } })),
  infoDialogOpen: false,
  setShowInfoDialog: (status) => set(() => ({ infoDialogOpen: status })),
  dataDialogOpen: false,
  setShowDataDialog: (status) => set(() => ({ dataDialogOpen: status })),
  spendingData: [],
  setSpendingData: (data) => set(() => ({ spendingData: data })),
  updateSpendingEntry: (index, updates) =>
    set((state) => ({
      spendingData: state.spendingData.map((entry, i) =>
        i === index ? { ...entry, ...updates } : entry,
      ),
    })),
  categoryTotals: {},
  setCategoryTotals: (totals) => set(() => ({ categoryTotals: totals })),
  backgroundColor: "#303035",
  setBackgroundColor: (color) => set(() => ({ backgroundColor: color })),
  floorColor: "#888888",
  setFloorColor: (color) => set(() => ({ floorColor: color })),
}));

export default useStore;
