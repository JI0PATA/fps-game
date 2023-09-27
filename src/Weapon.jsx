import {WeaponModel} from "./WeaponModel.jsx";

export const Weapon = (props) => {
    return (
        <group {...props}>
            <WeaponModel />
        </group>
    );
}