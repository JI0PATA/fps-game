import {useRoundsStore, IRoundsStore} from "@/store/RoundsStore.ts";
import styles from "@/UI/NumberOfRounds/styles.module.scss";

const RELOAD_BUTTON_NAME = import.meta.env.VITE_RELOAD_BUTTON_NAME;

const NumberOfRounds = () => {
    const countOfRounds = useRoundsStore((state: IRoundsStore) => state.countRounds);
    const isEmptyRounds = countOfRounds === 0;

    return (
        <div className={styles.rounds}>
            {!isEmptyRounds ? countOfRounds : RELOAD_BUTTON_NAME}
        </div>
    );
};

export default NumberOfRounds;