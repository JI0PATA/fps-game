import {Sky} from "@react-three/drei";
import {Ground} from "./Ground.jsx";

export const App = () => {
    return (
        <>
            <Sky sunPosition={[100, 20, 100]}/>
            <ambientLight intensity={1.5} />
            <Ground />
        </>
    )
}

export default App
