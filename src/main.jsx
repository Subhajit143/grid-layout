import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Prc from './Prc.jsx'
import {Ok} from "./Ok.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <Prc/> */}
    {/* <Ok/> */}
  </StrictMode>,
)
