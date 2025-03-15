import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Define the configuration with hardcoded values for development
// In production, use environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MSG_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase only if we have the required config
let app;
console.info('Firebase config:', firebaseConfig);
// Make sure we have at least the essential config values
if (firebaseConfig.apiKey && firebaseConfig.projectId) {
  try {
    app = initializeApp(firebaseConfig);
    console.log('Firebase initialized successfully');
  } catch (error) {
    console.error('Error initializing Firebase:', error);
  }
} else {
  console.error(
    'Firebase configuration is missing required values. Check your environment variables.'
  );
}

// export const analytics = getAnalytics(firebase_app);
const db = app ? getFirestore(app) : null;

export default db;
