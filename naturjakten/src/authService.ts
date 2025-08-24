import app from './firebaseConfig';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export async function login(email: string, password: string) {
  const auth = getAuth(app);
  return signInWithEmailAndPassword(auth, email, password);
}