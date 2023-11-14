import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import {WeaponModel} from "./WeaponModel.jsx";
import {useEffect, useRef, useState} from "react";
import {useFrame, useLoader} from "@react-three/fiber";
import {usePointerLockControlsStore} from "./App.jsx";
import {create} from "zustand";
import FlashShoot from "./assets/images/flash_shoot.png";

const SHOOT_BUTTON = parseInt(import.meta.env.VITE_SHOOT_BUTTON);
const AIM_BUTTON = parseInt(import.meta.env.VITE_AIM_BUTTON);
const recoilAmount = 0.03;
const recoilDuration = 50;
const easing = TWEEN.Easing.Quadratic.Out;

export const useAimingStore = create((set) => ({
    isAiming: null,
    setIsAiming: (value) => set(() => ({ isAiming: value }))
}));

export const Weapon = (props) => {
    const [recoilAnimation, setRecoilAnimation] = useState(null);
    const [isRecoilAnimationFinished, setIsRecoilAnimationFinished] = useState(true);
    const [isShooting, setIsShooting] = useState(false);
    const setIsAiming = useAimingStore((state) => state.setIsAiming);
    const weaponRef = useRef();

    const texture = useLoader(THREE.TextureLoader, FlashShoot);

    const [flashAnimation, setFlashAnimation] = useState(null);

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

    const generateNewPositionOfRecoil = (currentPosition = new THREE.Vector3(0, 0, 0)) => {
        const recoilOffset = generateRecoilOffset();
        return currentPosition.clone().add(recoilOffset);
    }

    const initRecoilAnimation = () => {
        const currentPosition = new THREE.Vector3(0, 0, 0);
        const newPosition = generateNewPositionOfRecoil(currentPosition);

        const twRecoilAnimation = new TWEEN.Tween(currentPosition)
            .to(newPosition, recoilDuration)
            .easing(easing)
            .repeat(1)
            .yoyo(true)
            .onUpdate(() => {
                weaponRef.current.position.copy(currentPosition);
            })
            .onStart(() => {
                setIsRecoilAnimationFinished(false);
            })
            .onComplete(() => {
                setIsRecoilAnimationFinished(true);
            });

        setRecoilAnimation(twRecoilAnimation);
    }

    const startShooting = () => {
        if (!recoilAnimation) return;

        recoilAnimation.start();
        flashAnimation.start();
    }

    useEffect(() => {
        initRecoilAnimation();
    }, []);

    useEffect(() => {
        if (isShooting) {
            startShooting();
        }
    }, [isShooting]);

    useFrame(() => {
        if (isShooting && isRecoilAnimationFinished) {
            startShooting();
        }
    });

    const [flashOpacity, setFlashOpacity] = useState(0);

    const initFlashAnimation = () => {
        const currentFlashParams = { opacity: 0 };

        const twFlashAnimation = new TWEEN.Tween(currentFlashParams)
            .to({ opacity: 1 }, recoilDuration)
            .easing(easing)
            .onUpdate(() => {
                setFlashOpacity(() => currentFlashParams.opacity);
            })
            .onComplete(() => {
                setFlashOpacity(() => 0);
            });

        setFlashAnimation(twFlashAnimation);
    }

    useEffect(() => {
        initFlashAnimation();
    }, []);

    return (
        <group {...props}>
            <group ref={weaponRef}>
                <mesh position={[0, 0.05, -2]} scale={[1, 1, 0]}>
                    <planeGeometry attach="geometry" args={[1, 1]} />
                    <meshBasicMaterial attach="material" map={texture} transparent={true} opacity={flashOpacity} />
                </mesh>
                <WeaponModel />
            </group>
        </group>
    );
}