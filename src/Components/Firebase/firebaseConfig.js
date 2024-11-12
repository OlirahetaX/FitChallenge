import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyByPdmDGUvprnHDqc_mMrS3E3yyY-ysYnE",
  authDomain: "proyectotecemergentes.firebaseapp.com",
  projectId: "proyectotecemergentes",
  storageBucket: "proyectotecemergentes.appspot.com",
  messagingSenderId: "220464706245",
  appId: "1:220464706245:web:2aad4172d90c6a5941f6ac"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);
export {app, auth, db};