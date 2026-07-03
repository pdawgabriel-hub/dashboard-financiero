import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ToastProvider } from './contextos/ToastContext/ToastContext.tsx'

createRoot(document.getElementById('root')!).render(
  //<StrictMode>
  <BrowserRouter>
    <ToastProvider>
      <App />
    </ToastProvider>
  </BrowserRouter>
  //</StrictMode>
)