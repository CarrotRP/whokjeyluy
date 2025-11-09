import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LenderContextProvider } from './context/LenderContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LenderContextProvider>
      <App />
    </LenderContextProvider>
  </StrictMode>,
)
