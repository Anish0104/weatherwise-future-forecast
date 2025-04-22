
// Firebase configuration for real-time updates
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';

// Your web app's Firebase configuration
// Replace with your actual Firebase config when implementing
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  databaseURL: "https://your-app.firebaseio.com",
  projectId: "your-app",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const subscribeSensorData = (callback: (data: any) => void) => {
  const sensorRef = ref(database, 'sensors');
  return onValue(sensorRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
};

export const subscribePredictionData = (callback: (data: any) => void) => {
  const predictionRef = ref(database, 'predictions');
  return onValue(predictionRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
};

export default app;
