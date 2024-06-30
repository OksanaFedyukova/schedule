import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";
import dotenv from 'dotenv';

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};

const apps = getApps();
const firebaseApp = apps.length === 0 ? initializeApp(firebaseConfig) : apps[0];

// Inicializar Firebase Analytics solo en el cliente si es compatible
if (typeof window !== 'undefined') {
  isSupported()
    .then(supported => {
      if (supported) {
        getAnalytics(firebaseApp);
      }
    })
    .catch(err => {
      console.error('Error initializing Firebase Analytics:', err);
    });
}

// Exportar la instancia de autenticación
export const auth = getAuth(firebaseApp);
export default firebaseApp;
