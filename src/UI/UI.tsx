import NumberOfRounds from "@/UI/NumberOfRounds/NumberOfRounds.tsx";
import {IAimingStore, useAimingStore} from "@/store/AimingStore.ts";
import styles from "@/UI/UI.module.scss";
import QuickAccessSlots from "@/UI/QuickAccessSlots/QuickAccessSlots.tsx";

const UI = () => {
    const isAiming = useAimingStore((state: IAimingStore) => state.isAiming);

    return (
        <div className="ui-root">
            {!isAiming && <div className={styles.aim} />}
            <NumberOfRounds/>
            <QuickAccessSlots />
        </div>
    );
};

export default UI;