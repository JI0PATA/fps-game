import {RigidBody} from "@react-three/rapier";

export const Player = () => {
    return (
        <>
            <RigidBody position={[0, 1, -2]}>
                <mesh>
                    <capsuleGeometry args={[0.5, 0.5]}/>
                </mesh>
            </RigidBody>
        </>
    );
}