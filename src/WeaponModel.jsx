import React from "react";
import { useGLTF } from "@react-three/drei";

export function WeaponModel(props) {
    const { nodes, materials } = useGLTF("/weapon.glb");
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_4.geometry}
                material={materials.gun_tex}
                scale={1.084}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_6.geometry}
                material={materials.gun_tex}
                position={[0, 0, 0.177]}
                scale={1.084}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_8.geometry}
                material={materials.gun_tex}
                position={[0, -0.285, -0.037]}
                scale={1.118}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_10.geometry}
                material={materials.gun_tex}
                position={[0, 0, 0.03]}
                scale={1.084}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_12.geometry}
                material={materials.gun_tex}
                position={[-0.02, 0, 0.21]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_14.geometry}
                material={materials.gun_tex}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_16.geometry}
                material={materials.gun_tex}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_18.geometry}
                material={materials.gun_tex}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_20.geometry}
                material={materials.gun_tex}
                position={[0, 0, -0.46]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_22.geometry}
                material={materials.gun_tex}
                position={[0.107, 0.018, 0.366]}
                rotation={[-0.305, 0, 0]}
                scale={1.09}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_24.geometry}
                material={materials.gun_tex}
                position={[0, -0.283, -0.026]}
                scale={1.1}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_26.geometry}
                material={materials.gun_tex}
                position={[0, -0.288, 0.512]}
                scale={1.099}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_28.geometry}
                material={materials.gun_tex}
                position={[0, -0.273, -0.028]}
                scale={1.084}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_30.geometry}
                material={materials.gun_tex}
                position={[0, -0.273, -0.028]}
                scale={1.084}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_32.geometry}
                material={materials.gun_tex}
                position={[0, -0.262, 0.004]}
                scale={1.083}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_34.geometry}
                material={materials.gun_tex}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_36.geometry}
                material={materials.gun_tex}
                position={[0, 0, -0.46]}
            />
        </group>
    );
}

useGLTF.preload("/weapon.glb");
