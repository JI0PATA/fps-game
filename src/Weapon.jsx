import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import {WeaponModel} from "./WeaponModel.jsx";
import {useEffect, useRef, useState} from "react";
import {useFrame} from "@react-three/fiber";
import {usePointerLockControlsStore} from "./App.jsx";
import {create} from "zustand";

const SHOOT_BUTTON = parseInt(import.meta.env.VITE_SHOOT_BUTTON);
const AIM_BUTTON = parseInt(import.meta.env.VITE_AIM_BUTTON);
const recoilAmount = 0.03;
const recoilDuration = 100;
const easing = TWEEN.Easing.Quadratic.Out;

export const useAimingStore = create((set) => ({
    isAiming: null,
    setIsAiming: (value) => set(() => ({ isAiming: value }))
}));

export const Weapon = (props) => {
    const [recoilAnimation, setRecoilAnimation] = useState(null);
    const [recoilBackAnimation, setRecoilBackAnimation] = useState(null);
    const [isShooting, setIsShooting] = useState(false);
    const setIsAiming = useAimingStore((state) => state.setIsAiming);
    const weaponRef = useRef();

    useEffect(() => {
        document.addEventListener('mousedown', (ev) => {
            ev.preventDefault();
            mouseButtonHandler(ev.button, true);
        });

        document.addEventListener('mouseup', (ev) => {
            ev.preventDefault();
            mouseButtonHandler(ev.button, false);
        });
    }, []);

    const mouseButtonHandler = (button, state) => {
        if (!usePointerLockControlsStore.getState().isLock) return;

        switch (button) {
            case SHOOT_BUTTON:
                setIsShooting(state);
                break;
            case AIM_BUTTON:
                setIsAiming(state);
                break;
        }
    }

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