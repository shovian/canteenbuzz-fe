import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getFirestore,
  setDoc,
  addDoc,
  Timestamp,
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
  constructor(
    id: String | undefined,
    penjualId: String | undefined,
    waktu: Date | undefined,
    status: String | undefined,
    nama: String | undefined,
    token: String | undefined
  ) {
    this.id = id;
    this.penjualId = penjualId;
    this.waktu = waktu;
    this.status = status;
    this.nama = nama;
    this.token = token;
  }

  static async build(nama: String) {
    const pembeliRef = collection(db, "pembeli");
    const currentDate = new Date();
    const pembeliRes = await addDoc(pembeliRef, {
      nama: nama,
      waktu: currentDate,
      status: "Wait",
    });
    const newPembeli = {
      id: pembeliRes.id,
      nama: nama,
      waktu: currentDate,
      status: "Wait",
    };

    return new Pembeli(
      newPembeli.id,
      undefined,
      newPembeli.waktu,
      newPembeli.status,
      newPembeli.nama,
      undefined
    );
  }
  getId(): String {
    return this.id || "";
  }
  getWaktu(): Date {
    return this.waktu || new Date();
  }

  setWaktu(waktu: Date): void {
    this.waktu = waktu;
  }

  getStatus(): String {
    return this.status || "";
  }

  async setStatus(status: String) {
    this.status = status;
    const refPembeli = doc(db, "pembeli", this.id as string);
    await setDoc(refPembeli, { status: status }, { merge: true });
  }

  getNama(): String {
    return this.nama || "";
  }
  setNama(nama: String): void {
    this.nama = nama;
  }
  async setPenjualId(id: String) {
    this.penjualId = id;
    const refPembeli = doc(db, "pembeli", this.id as string);
    await setDoc(refPembeli, { penjualId: id }, { merge: true });
  }
  getPenjualId(): String {
    return this.penjualId || "";
  }
  async setToken(token: String) {
    this.token = token;
    const refPembeli = doc(db, "pembeli", this.id as string);
    await setDoc(refPembeli, { token: token }, { merge: true });
  }
  getToken(): String {
    return this.token || "";
  }
}
