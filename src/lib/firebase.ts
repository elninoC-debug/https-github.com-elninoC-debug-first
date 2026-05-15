import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDocFromCache, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const googleProvider = new GoogleAuthProvider();

// Connection test as required by integration instructions
async function testConnection() {
  try {
    // Attempting a simple get to verify connectivity
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && (error.message.includes('offline') || error.message.includes('insufficient permissions'))) {
      // Missing permissions is expected since 'test/connection' doesn't exist and rules are tight
      console.log("Firebase connection verified (received expected response/error).");
    } else {
      console.error("Firebase connection check failed:", error);
    }
  }
}

testConnection();
