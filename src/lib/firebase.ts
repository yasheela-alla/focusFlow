import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:
    import.meta.env.VITE_FIREBASE_API_KEY ||
    "AIzaSyBM1W8Gpm3KwDY5YRF0W8q1khOQj1Z_cd0",
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ||
    "focusflow-d2728.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "focusflow-d2728",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
    "focusflow-d2728.firebasestorage.app",
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "384422259398",
  appId:
    import.meta.env.VITE_FIREBASE_APP_ID ||
    "1:384422259398:web:89329335022bcdf93505c7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out", error);
    throw error;
  }
};

export { auth };
