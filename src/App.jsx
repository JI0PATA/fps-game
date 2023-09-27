import {PointerLockControls, Sky} from "@react-three/drei";
import {Ground} from "./Ground.jsx";
import {Physics} from "@react-three/rapier";
import {Player} from "./Player.jsx";
import {Cubes} from "./Cube.jsx";
import {WeaponModel} from "./WeaponModel.jsx";

export const App = () => {
    return (
        <>
            <PointerLockControls />
            <Sky sunPosition={[100, 20, 100]}/>
            <ambientLight intensity={1.5} />
            <directionalLight
                castShadow
                intensity={.8}
                position={[50, 50, 0]} />
            <Physics gravity={[0, -20, 0]}>
                <Ground />
                <Player />
                <Cubes />
            </Physics>

            <group position={[3, 1, -2]}>
                <WeaponModel />
            </group>
        </>
    )
}

export default App
