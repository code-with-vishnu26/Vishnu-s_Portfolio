import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'
import { Toaster } from './components/ui/toaster.tsx'

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
    <Toaster />
  </HelmetProvider>
);
