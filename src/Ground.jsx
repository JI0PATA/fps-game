export const Ground = () => {
    return (
        <mesh position={[0, -5, 0]} rotation-x={-Math.PI / 2}>
            <planeGeometry args={[500, 500]} />
            <meshStandardMaterial color="gray" />
        </mesh>
    );
}