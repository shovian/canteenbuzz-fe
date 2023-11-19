import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  collection,
  query, 
  where,
  orderBy,
  limit,
  doc,
  updateDoc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCMkbts9TUfOOdlYJEH0Rxu-eZhFWRpJk",
  authDomain: "canteenbuzz.firebaseapp.com",
  projectId: "canteenbuzz",
  storageBucket: "canteenbuzz.appspot.com",
  messagingSenderId: "217486325376",
  appId: "1:217486325376:web:abf6a86816772eb7b5d865",
  measurementId: "G-XBZVX84M5D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// type Penjual = { pesanan: Pembeli[]; addPesanan: (pembeli: Pembeli) => {} };

export async function getPesanan(
  penjualId: String
) {
    var res = false;
    const docSnap = await collection(db, "kantin");
    const kantin = await getDocs(query(docSnap, where("penjualId", "==", penjualId), limit(1)));

    if(!kantin.empty){
        const pembeli = await getDocs(query(collection(db, "pembeli"), where("kantinId", "==", kantin.docs[0].id), orderBy("waktu", "desc")));
        return pembeli;
    }

    return null;
}

export async function setKios(
    id: string,
    kios: String
){
    var res = false;
    const kiosRef = doc(db, "kantin", ""+id);

    const update = await updateDoc(kiosRef, {
        namaKios: kios
    });

    return update;
}
