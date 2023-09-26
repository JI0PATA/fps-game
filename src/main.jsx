import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Canvas} from "@react-three/fiber";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div id="container">
        <div className="aim"></div>
        <Canvas camera={{ fov: 45, position: [0, 5, 0] }}>
            <App />
        </Canvas>
    </div>
  </React.StrictMode>,
)
