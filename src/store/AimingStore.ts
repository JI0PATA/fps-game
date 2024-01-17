import {create} from "zustand";

export interface IAimingStore {
    isAiming: boolean;
    setIsAiming: (value: boolean ) => void;
}

export const useAimingStore = create<IAimingStore>()((set) => ({
    isAiming: false,
    setIsAiming: (value) => set(() => ({ isAiming: value }))
}));