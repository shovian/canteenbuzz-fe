// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  collection,
  query,
  where,
  getDoc,
  getDocs,
  getFirestore,
  doc,
} from "firebase/firestore";
import { Penjual } from "../Penjual/entity";
import { Pembeli } from "../Pembeli/entity";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

export type TKantin = {
  penjuals: Penjual[];
};
export class Kantin implements TKantin {
  penjuals: Penjual[];
  constructor(penjuals: Penjual[]) {
    this.penjuals = penjuals;
  }
  static async build() {
    const id = "chygOuNC3MODVNqyVnAw";
    const refPenjual = collection(db, "penjual");
    const queryPenjual = query(refPenjual, where("kantinId", "==", id));
    const resPenjual = await getDocs(queryPenjual);
    const fetchedPenjuals: Penjual[] = [];
    const refPembeli = collection(db, "pembeli");
    const queryPembeli = query(refPembeli);
    const resPembeli = await getDocs(queryPembeli);
    const fetchedPesanan: Pembeli[] = [];
    resPembeli.forEach((docPembeli) => {
      const tempPembeli = {
        id: docPembeli.id,
        ...docPembeli.data(),
      } as unknown as Pembeli;
      fetchedPesanan.push(tempPembeli);
    });
    resPenjual.forEach((doc) => {
      const tempPenjual = {
        id: doc.id,
        ...doc.data(),
        pesanan: fetchedPesanan.filter((pesanan) => {
          return pesanan.penjualId === doc.id;
        }),
      } as unknown as Penjual;
      fetchedPenjuals.push(tempPenjual);
    });

    return new Kantin(fetchedPenjuals);
  }
  // async getPenjualById(id: String) {
  //   return this.penjuals.filter((node) => {
  //     return node.id === id;
  //   })[0];
  // }
  getPenjualByCredentials(username: String, password: String) {
    return this.penjuals.filter((node) => {
      return node.username === username && node.password === password;
    })[0];
  }
  getPenjualByKios(kios: String) {
    return this.penjuals.filter((node) => {
      return node.kios === kios;
    })[0];
  }
  getPenjualById(id: String) {
    return this.penjuals.filter((node) => {
      return node.id === id;
    })[0];
  }
  async getPenjualByCode(code: String) {
    return this.penjuals.filter((node) => {
      return node.code === code;
    })[0];
  }
}
