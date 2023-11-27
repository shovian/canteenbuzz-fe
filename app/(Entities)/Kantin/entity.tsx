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
  Timestamp,
} from "firebase/firestore";
import { Penjual, TPenjual } from "../Penjual/entity";
import { Pembeli, TPembeli } from "../Pembeli/entity";
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
      const tempPembeli: TPembeli = {
        id: docPembeli.id,
        ...docPembeli.data(),
      };
      const tempTimestamp = tempPembeli.waktu as unknown as Timestamp;
      const pembeli: Pembeli = new Pembeli(
        tempPembeli.id,
        tempPembeli.penjualId,
        tempTimestamp ? tempTimestamp.toDate() : tempTimestamp,
        tempPembeli.status,
        tempPembeli.nama,
        tempPembeli.token
        // waktu: tempTimestamp.toDate(),
      );

      fetchedPesanan.push(pembeli);
    });
    resPenjual.forEach((doc) => {
      const tempPenjual: TPenjual = {
        id: doc.id,
        ...doc.data(),
        pesanan: fetchedPesanan.filter((pesanan) => {
          return pesanan.getPenjualId() === doc.id;
        }),
      };
      fetchedPenjuals.push(
        new Penjual(
          tempPenjual.id,
          tempPenjual.kantinId,
          tempPenjual.kios,
          tempPenjual.username,
          tempPenjual.password,
          tempPenjual.pesanan
        )
      );
    });

    return new Kantin(fetchedPenjuals);
  }
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
      return node.getId() === id;
    })[0];
  }
}
