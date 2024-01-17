import {useQuickAccessSlotsStore} from "@/store/QuickAccessSlotsStore.ts";
import styles from "@/UI/QuickAccessSlots/styles.module.scss";

const QuickAccessSlots = () => {
    const slots = useQuickAccessSlotsStore((state) => state.slots);

    return (
        <div className={styles.slots}>
            {slots.map((slot, key) => (
                <div key={key} className={styles.slot}>
                    <span className={styles.key}>{key + 1}</span>
                    {slot.item && <img src={`/images/icons/${slot.item}`} alt={`${slot.item} ICON`}/>}
                </div>
            ))}
        </div>
    );
};

export default QuickAccessSlots;