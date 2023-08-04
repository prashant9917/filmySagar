
import { initializeApp } from "firebase/app";
import{getFirestore, collection} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBl7uc9sT9I02pqtCy6hMyilNDG9UvcugI",
  authDomain: "filmysagar-8c027.firebaseapp.com",
  projectId: "filmysagar-8c027",
  storageBucket: "filmysagar-8c027.appspot.com",
  messagingSenderId: "615745987508",
  appId: "1:615745987508:web:886cd92418d54f3c4788e1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const movieRef = collection(db, "movies")
export const reviewsRef = collection(db, "reviews")
export const usersRef = collection(db, "users")
export default app;