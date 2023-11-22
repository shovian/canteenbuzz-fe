import { initializeApp } from "firebase/app";
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
  setDoc,
  addDoc,
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
const db = getFirestore(app);

export type TPembeli = {
  id?: String;
  penjualId?: String;
  waktu?: Date;
  status?: String;
  nama?: String;
  token?: String;
};
export class Pembeli implements TPembeli {
  id: String | undefined;
  penjualId: String | undefined;
  waktu: Date | undefined;
  status: String | undefined;
  nama: String | undefined;
  token: String | undefined;
  constructor(pembeli: Pembeli | undefined) {
    this.id = pembeli?.id;
    this.penjualId = pembeli?.penjualId;
    this.waktu = pembeli?.waktu;
    this.status = pembeli?.status;
    this.nama = pembeli?.nama;
    this.token = pembeli?.token;
  }

  static async build(nama: String) {
    const pembeliRef = collection(db, "pembeli");
    const pembeliRes = await addDoc(pembeliRef, {
      nama: nama,
      waktu: new Date(),
      status: "Wait",
    });
    const newPembeli: Pembeli = {
      id: pembeliRes.id,
      nama: nama,
      waktu: new Date(),
      status: "Wait",
    } as unknown as Pembeli;

    return new Pembeli(newPembeli);
  }
  getWaktu(): Date | undefined {
    return this.waktu;
  }

  setWaktu(waktu: Date): void {
    this.waktu = waktu;
  }

  getStatus(): String | undefined {
    return this.status;
  }

  async setStatus(status: String) {
    this.status = status;
    const refPembeli = doc(db, "pembeli", this.id as string);
    await setDoc(refPembeli, { status: status }, { merge: true });
  }

  getNama(): String | undefined {
    return this.nama;
  }

  setNama(nama: String): void {
    this.nama = nama;
  }

  setPenjualId(id: String | undefined) {
    this.penjualId = id;

    const refPembeli = doc(db, "pembeli", this.id as string);
    setDoc(refPembeli, { penjualId: id }, { merge: true });
  }
  setToken(token: String | undefined) {
    this.token = token;
    const refPembeli = doc(db, "pembeli", this.id as string);
    setDoc(refPembeli, { token: token }, { merge: true });
  }
}
