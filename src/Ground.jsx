import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import floorTexture from "./assets/floor.png";
import {CuboidCollider, RigidBody} from "@react-three/rapier";

export const Ground = () => {
    const texture = useTexture(floorTexture);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

    return (
        <RigidBody type="fixed" colliders={false}>
            <mesh position={[0, 0, 0]} rotation-x={-Math.PI / 2}>
                <planeGeometry args={[500, 500]} />
                <meshStandardMaterial color="gray" map={texture} map-repeat={[100, 100]} />
            </mesh>
            <CuboidCollider args={[500, 2, 500]} position={[0, -2, 0]}/>
        </RigidBody>
    );
}