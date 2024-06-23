// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBAW1NxoByDWmnmUK8lNTwxhJlG8JOiPHo",
  authDomain: "esp32-ex-demo.firebaseapp.com",
  databaseURL:
    "https://esp32-ex-demo-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "esp32-ex-demo",
  storageBucket: "esp32-ex-demo.appspot.com",
  messagingSenderId: "688146094021",
  appId: "1:688146094021:web:fe7485c9dc7ce9016f5dac",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
