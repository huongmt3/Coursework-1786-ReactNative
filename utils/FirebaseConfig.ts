import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDAiMlIE_cYrmAzK3eJo_sDm_wVsFC5xQA",
  authDomain: "coursework-1786-yogadb",
  databaseURL: "https://coursework-1786-yogadb-default-rtdb.firebaseio.com",
  projectId: "coursework-1786-yogadb",
  storageBucket: "coursework-1786-yogadb.firebasestorage.app",
  messagingSenderId: "74141360784",
  appId: "1:74141360784:android:b63ec98fcf1d811342ae15",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };