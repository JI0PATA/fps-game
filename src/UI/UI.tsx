import NumberOfRounds from "@/UI/NumberOfRounds/NumberOfRounds.tsx";
import {IAimingStore, useAimingStore} from "@/store/AimingStore.ts";
import styles from "@/UI/UI.module.scss";

const UI = () => {
    const isAiming = useAimingStore((state: IAimingStore) => state.isAiming);

    return (
        <div className="ui-root">
            {!isAiming && <div className={styles.aim} />}
            <NumberOfRounds/>
        </div>
    );
};

export default UI;