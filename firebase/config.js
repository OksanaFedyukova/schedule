import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyB8CwM3ToeRoX-Sqdscw8Ri7JhNBbgUuO4",
  authDomain: "schedule-88e7a.firebaseapp.com",
  projectId: 'schedule-88e7a',
  storageBucket: "schedule-88e7a.appspot.com",
  messagingSenderId: "122655986377",
  appId: "1:122655986377:web:aa0f3f2cceca044f45b318",
  measurementId: "G-S9XN6ZB748 "
};


const firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

if (typeof window !== 'undefined') {
  isSupported().then(supported => {
    if (supported) {
      getAnalytics(firebase_app);
    }
  }).catch(err => {
    console.error(err);
  });
}

export const auth = getAuth(firebase_app);
export default firebase_app;
