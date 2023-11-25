import qrcode from "qrcode-generator";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import {
  getPenjualByCredentials,
  getPenjualByKios,
} from "../KantinHandler/handler";
import { Penjual, TPenjual, db } from "@/app/(Entities)/Penjual/entity";
import {
  Timestamp,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { Pembeli, TPembeli } from "@/app/(Entities)/Pembeli/entity";
import { Dispatch, SetStateAction } from "react";
import { getPembeliByNamaAndKios } from "../PembeliHandler/handler";

export async function notifyPembeli(nama: String) {
  const penjual = getCurrentPenjual();
  const pembeli = await getPembeliByNamaAndKios(
    nama,
    penjual.getKios() as String
  );

  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      Authorization: "Basic ZmU4NzU0YzctMGNhMi00YTFiLWJkMTYtODViYjljMmQzYjkw",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      app_id: "38b65b98-e456-48ea-9ea8-a62643db0e26",
      include_subscription_ids: [pembeli.getToken()],
      contents: {
        en: "Pesanan Kamu sudah selesai!",
      },
    }),
  };
  pembeli.getStatus() === "Wait"
    ? fetch("https://onesignal.com/api/v1/notifications", options)
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          pembeli.setStatus("Ready");
          setTimeout(() => {
            pembeli.setStatus("Done");
          }, 20000);
        })
        .catch((err) => console.error(err))
    : {};
}
export async function addPesanan(nama: String, kios: String) {
  const penjual = await getPenjualByKios(kios);
  const pembeli = await Pembeli.build(nama);
  pembeli.setPenjualId(penjual?.getId());
  if (penjual) {
    penjual.setPesanan([...penjual.getPesanan(), pembeli]);
  }
}
export async function isPenjualAvailable(username: String, password: String) {
  const penjual = await getPenjualByCredentials(username, password);
  return penjual === undefined ? false : true;
}
export async function isPenjualLoggedAndAvailable() {
  if (isPenjualLogged()) {
    const username = getCurrentPenjualUsername();
    const password = getCurrentPenjualPassword();

    return await isPenjualAvailable(username || "", password || "").then(
      (isAvailable) => {
        if (isAvailable) {
          return true;
        } else {
          return false;
        }
      }
    );
  } else return false;
}
export async function getPesananByNama(name: String) {
  const queryPembeli = query(
    collection(db, "pembeli"),
    where("nama", "==", name)
  );
  const resPembeli = await getDocs(queryPembeli);
  const pesanan: Pembeli[] = [];
  const currentPenjual = getCurrentPenjual();
  resPembeli.forEach((doc) => {
    const data = doc.data() as Pembeli;
    if (currentPenjual!.getId() === data.getPenjualId()) {
      pesanan.push(data);
    }
  });
  return pesanan[0];
}

export function getCurrentPenjual() {
  const penjualString =
    typeof window !== "undefined" ? localStorage.getItem("penjual") : "";
  const penjual: TPenjual = penjualString
    ? JSON.parse(penjualString)
    : new Penjual(undefined, undefined, undefined, undefined, undefined);
  return new Penjual(
    penjual.id,
    penjual.kantinId,
    penjual.kios,
    penjual.username,
    penjual.password,
    penjual.pesanan
  );
}
export function getCurrentPenjualNamaKios() {
  const penjual = getCurrentPenjual();
  return penjual?.kios;
}
export function getCurrentPenjualUsername() {
  const penjual = getCurrentPenjual();
  return penjual?.username;
}
export function getCurrentPenjualPassword() {
  const penjual = getCurrentPenjual();
  return penjual?.password;
}
export function setLoggedPenjual(penjual: Penjual | undefined) {
  typeof window !== "undefined"
    ? localStorage.setItem("penjual", JSON.stringify(penjual))
    : null;
}
export function setLoggedPenjualByCredentials(
  username: String,
  password: String
) {
  getPenjualByCredentials(username, password).then((penjual) => {
    setLoggedPenjual(penjual);
  });
}
export function updateCurrentPenjual(penjual: Penjual) {
  removeLoggedPenjual();
  setLoggedPenjual(penjual);
}
export function removeLoggedPenjual() {
  typeof window !== "undefined" ? localStorage.removeItem("penjual") : null;
}
export function redirectGeneration(router: AppRouterInstance) {
  router.push("/generate");
}
export function redirectListPage(router: AppRouterInstance) {
  router.push("/list");
}
export function isPenjualLogged() {
  const isLogged = getCurrentPenjual() != null;
  return isLogged;
}
export function isNamaKiosAvailable() {
  const namaKios = getCurrentPenjualNamaKios();
  return namaKios;
}
export function assignNamaKios(kios: String) {
  const penjual = getCurrentPenjual();

  if (penjual.getId() != "") {
    penjual.setKios(kios);
    updateCurrentPenjual(penjual);
  }
}
export function subscribePesanan(callback: (stringArr: String[]) => void) {
  const penjual = getCurrentPenjual();
  const unsub = onSnapshot(collection(db, "pembeli"), (doc) => {
    const fetchedPembeli: Pembeli[] = [];
    const fetchedPesanan: String[] = [];
    doc.docs.forEach((data) => {
      const pesanan: TPembeli = { id: data.id, ...data.data() };
      if (pesanan.penjualId === penjual!.getId() && pesanan.status !== "Done")
        fetchedPembeli.push(
          new Pembeli(
            pesanan.id,
            pesanan.penjualId,
            (pesanan.waktu as unknown as Timestamp).toDate(),
            pesanan.status,
            pesanan.nama,
            pesanan.token
          )
        );
    });
    fetchedPembeli.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      const aTime = new Date(a.getWaktu()).getTime();
      const bTime = new Date(b.getWaktu()).getTime();

      return aTime - bTime;
    });
    fetchedPembeli.forEach((pembeli) => {
      fetchedPesanan.push(pembeli.getNama());
    });

    callback(fetchedPesanan);
  });
}
export function convertToFile(QR: HTMLImageElement) {
  return QR.src;
}
export function generateQRURL(code: String) {
  code = code.split(" ").join("");
  const pathname =
    window.location.protocol +
    "//" +
    window.location.hostname +
    ":" +
    window.location.port +
    "/name/" +
    code;
  const qr = qrcode(4, "L");
  qr.addData(pathname);
  qr.make();
  const imgString = qr.createImgTag(10);
  const imgObj = new Image();
  imgObj.src = imgString.split('"')[1];

  const data = { data: { URL: pathname, QR: imgObj } };

  return data;
}
