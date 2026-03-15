import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId='630522911812-lnmi2p9trbdg1sit9h5po5p8j36fgrso.apps.googleusercontent.com'>
    <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
