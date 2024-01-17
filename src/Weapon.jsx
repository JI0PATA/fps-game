import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import {WeaponModel} from "@/WeaponModel.jsx";
import {useEffect, useRef, useState} from "react";
import {useLoader} from "@react-three/fiber";
import {usePointerLockControlsStore} from "@/App.jsx";
import SingleShootAK47 from "@/assets/sounds/single-shoot-ak47.wav";
import ShootWithoutBullet from "@/assets/sounds/shoot-without-bullet.wav";
import FlashShoot from "@/assets/images/flash_shoot.png";
import {useAimingStore} from "@/store/AimingStore.ts";
import {useRoundsStore} from "@/store/RoundsStore.ts";
import {PositionalAudio} from '@react-three/drei';

const SHOOT_BUTTON = parseInt(import.meta.env.VITE_SHOOT_BUTTON);
const AIM_BUTTON = parseInt(import.meta.env.VITE_AIM_BUTTON);
const RELOAD_BUTTON_CODE = import.meta.env.VITE_RELOAD_BUTTON_CODE;
const recoilAmount = 0.03;
const recoilDuration = 50;
const easing = TWEEN.Easing.Quadratic.Out;

export const Weapon = (props) => {
    const [recoilAnimation, setRecoilAnimation] = useState(null);
    const [isRecoilAnimationFinished, setIsRecoilAnimationFinished] = useState(true);
    const [isShooting, setIsShooting] = useState(false);
    const setIsAiming = useAimingStore((state) => state.setIsAiming);
    const weaponRef = useRef();

    const countOfRounds = useRoundsStore((state) => state.countRounds);
    const dispatchDecreaseRounds = useRoundsStore((state) => state.decreaseRounds);
    const dispatchReloadRounds = useRoundsStore((state) => state.reloadRounds);

    const positionalAudioRef = useRef();
    const [audioUrl, setAudioUrl] = useState(SingleShootAK47);

    useEffect(() => {
        if (countOfRounds > 0) {
            setAudioUrl(SingleShootAK47);
        } else {
            setAudioUrl(ShootWithoutBullet);
        }
    }, [countOfRounds]);

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

        document.addEventListener('keypress', (ev) => {
            ev.preventDefault();

            if (ev.code === RELOAD_BUTTON_CODE) {
                dispatchReloadRounds();
            }
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

        positionalAudioRef.current.stop();
        positionalAudioRef.current.play();

        if (countOfRounds > 0) {
            dispatchDecreaseRounds();
            recoilAnimation.start();
            flashAnimation.start();
        }
    }

    useEffect(() => {
        initRecoilAnimation();
    }, []);

    useEffect(() => {
        if (isShooting && isRecoilAnimationFinished) {
            startShooting();
        }
    }, [isShooting, isRecoilAnimationFinished]);

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
                <PositionalAudio url={audioUrl} autoplay={false} loop={false} ref={positionalAudioRef} />
            </group>
        </group>
    );
}