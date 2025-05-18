import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { RefetchProvider } from "./context/RefetchProvider.tsx";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RefetchProvider>
      <App />
    </RefetchProvider>
  </StrictMode>,
)
