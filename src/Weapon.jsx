import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import {WeaponModel} from "./WeaponModel.jsx";
import {useEffect, useRef, useState} from "react";
import {useFrame} from "@react-three/fiber";

const recoilAmount = 0.03;
const recoilDuration = 100;
const easing = TWEEN.Easing.Quadratic.Out;

export const Weapon = (props) => {
    const [recoilAnimation, setRecoilAnimation] = useState(null);
    const [recoilBackAnimation, setRecoilBackAnimation] = useState(null);
    const [isShooting, setIsShooting] = useState(false);
    const weaponRef = useRef();

    document.addEventListener('mousedown', () => {
        setIsShooting(true);
    });

    document.addEventListener('mouseup', () => {
        setIsShooting(false);
    });

    const generateRecoilOffset = () => {
        return new THREE.Vector3(
            Math.random() * recoilAmount,
            Math.random() * recoilAmount,
            Math.random() * recoilAmount,
        )
    }

    const generateNewPositionOfRecoil = (currentPosition) => {
        const recoilOffset = generateRecoilOffset();
        return currentPosition.clone().add(recoilOffset);
    }

    const initRecoilAnimation = () => {
        const currentPosition = new THREE.Vector3(0, 0, 0);
        const initialPosition = new THREE.Vector3(0, 0, 0);
        const newPosition = generateNewPositionOfRecoil(currentPosition);

        const twRecoilAnimation = new TWEEN.Tween(currentPosition)
            .to(newPosition, recoilDuration)
            .easing(easing)
            .onUpdate(() => {
                weaponRef.current.position.copy(currentPosition);
            });

        const twRecoilBackAnimation = new TWEEN.Tween(currentPosition)
            .to(initialPosition, recoilDuration)
            .easing(easing)
            .onUpdate(() => {
                weaponRef.current.position.copy(currentPosition);
            });

        twRecoilAnimation.chain(twRecoilBackAnimation);

        setRecoilAnimation(twRecoilAnimation);
        setRecoilBackAnimation(twRecoilBackAnimation);
    }

    const startShooting = () => {
        recoilAnimation.start();
    }

    useEffect(() => {
        initRecoilAnimation();

        if (isShooting) {
            startShooting();
        }
    }, [isShooting]);

    useFrame(() => {
        TWEEN.update();

        if (isShooting) {
            startShooting();
        }
    });

    return (
        <group {...props}>
            <group ref={weaponRef}>
                <WeaponModel />
            </group>
        </group>
    );
}