import {create} from "zustand";
import default_slots from "@/quick_access_slots.json";

const SLOTS_COUNT = 5 as const;

type QuickAccessSlotsType = {
    item: string;
}

interface IQuickAccessSlotsStore {
    slots: QuickAccessSlotsType[];
}

export const useQuickAccessSlotsStore = create<IQuickAccessSlotsStore>()(() => ({
    slots: default_slots.concat(Array(SLOTS_COUNT - default_slots.length).fill({
        item: null
    }))
}));