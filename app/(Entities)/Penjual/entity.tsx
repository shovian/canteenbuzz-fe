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
  Timestamp,
} from "firebase/firestore";
import { Pembeli } from "../Pembeli/entity";
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
export const db = getFirestore(app);

export type TPenjual = {
  id?: String;
  kantinId?: String;
  kios?: String;
  username?: String;
  password?: String;
  code?: String;
  pesanan?: Pembeli[];
};
export class Penjual implements TPenjual {
  id?: String;
  kantinId?: String;
  kios?: String;
  username?: String;
  password?: String;
  code?: String;
  pesanan?: Pembeli[];

  constructor(penjual: Penjual | undefined) {
    this.id = penjual?.id;
    this.kantinId = penjual?.kantinId;
    this.kios = penjual?.kios ? penjual.kios : undefined;
    this.username = penjual?.username;
    this.password = penjual?.password;
    this.code = penjual?.code;
    this.pesanan = penjual?.pesanan ? penjual.pesanan : [];
  }

  setId(id: String): void {
    this.id = id;
  }

  setKantinId(kantinId: String): void {
    this.kantinId = kantinId;
  }

  setKios(kios: String) {
    this.kios = kios;
    setDoc(
      doc(db, "penjual", this.id as string),
      { kios: kios },
      { merge: true }
    );
  }

  setUsername(username: String): void {
    this.username = username;
  }

  setPassword(password: String): void {
    this.password = password;
  }

  setCode(code: String): void {
    this.code = code;
  }

  setPesanan(pesanan: Pembeli[]): void {
    this.pesanan = pesanan;
  }

  getId(): String | undefined {
    return this.id;
  }

  getKantinId(): String | undefined {
    return this.kantinId;
  }

  getKios(): String | undefined {
    return this.kios;
  }

  getUsername(): String | undefined {
    return this.username;
  }

  getPassword(): String | undefined {
    return this.password;
  }

  getCode(): String | undefined {
    return this.code;
  }
  getPesanan(): Pembeli[] {
    return this.pesanan || [];
  }
  // getPesanan(): Pembeli[] {
  //   //theres something to do with this
  //   const fetchedPembeli: Pembeli[] = [];
  //   this.pesanan?.forEach((pembeli) => {
  //     const tempTimestamp = pembeli.waktu as unknown as Timestamp;
  //     pembeli.getWaktu()
  //       ? fetchedPembeli.push(pembeli)
  //       : fetchedPembeli.push(
  //           new Pembeli({
  //             ...pembeli,
  //             waktu: tempTimestamp.toDate(),
  //           } as Pembeli)
  //         );
  //   });
  //   return fetchedPembeli;
  // }
}
