import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
      apiKey: "AIzaSyCElhzgYMHD0R_6fZzHUL3sRqnPsl5gO8M",
      authDomain: "capture-the-flag-dcc.firebaseapp.com",
      projectId: "capture-the-flag-dcc",
      storageBucket: "capture-the-flag-dcc.appspot.com",
      messagingSenderId: "381483971051",
      appId: "1:381483971051:web:03ba918eb625a27d40a9ae",
      measurementId: "G-8N0RE2LJEM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider;
export { auth, provider,firebaseConfig };