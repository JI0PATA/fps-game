import {create} from "zustand";

const defaultCountOfRounds = 30;

export interface IRoundsStore {
    countRounds: number;
    decreaseRounds: () => void;
    reloadRounds: () => void;
}

export const useRoundsStore = create<IRoundsStore>()((set) => ({
    countRounds: defaultCountOfRounds,
    decreaseRounds: () => set(({ countRounds }) => {
        return {
            countRounds: Math.max(countRounds - 1, 0)
        }
    }),
    reloadRounds: () => set(() => {
        return {
            countRounds: defaultCountOfRounds
        }
    })
}));