import { Pembeli, TPembeli } from "@/app/(Entities)/Pembeli/entity";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { getPenjualById, getPenjualByKios } from "../KantinHandler/handler";
import { Penjual, db } from "@/app/(Entities)/Penjual/entity";
import { addPesanan } from "../PenjualHandler/handler";
import { Dispatch, SetStateAction } from "react";
import { Timestamp, collection, doc, onSnapshot } from "firebase/firestore";
import OneSignal from "react-onesignal";

export async function getPembeliByNamaAndKios(nama: String, kios: String) {
  const penjual: Penjual = await getPenjualByKios(kios);
  const pembeli = penjual.getPesanan().filter((node) => {
    return node.getNama() === nama;
  });
  return new Pembeli(
    pembeli[0].getId(),
    pembeli[0].getPenjualId(),
    pembeli[0].getWaktu(),
    pembeli[0].getStatus(),
    pembeli[0].getNama(),
    pembeli[0].getToken()
  );
}
export async function subscribePushNotification() {
  await OneSignal.init({
    appId: "38b65b98-e456-48ea-9ea8-a62643db0e26",
    allowLocalhostAsSecureOrigin: true,
  }).finally(() => {
    OneSignal.Slidedown.promptPush({ force: true });
    OneSignal.Notifications.addEventListener("permissionChange", () => {
      typeof window !== "undefined" ? window.location.reload() : {};
    });
  });
  OneSignal.User.PushSubscription.id
    ? storeToken(OneSignal.User.PushSubscription.id as String)
    : {};
}
export async function storeToken(token: String) {
  const pembeli = getCurrentPembeli();
  pembeli.setToken(token);
  setCurrentPembeli(pembeli);
}
export async function assignNama(
  nama: String,
  kios: String,
  router: AppRouterInstance
) {
  await addPesanan(nama, kios);
  setCurrentPembeli(await getPembeliByNamaAndKios(nama, kios));

  redirectTunggu(router);
}
export async function subscribeAntrian(callback: (string: String) => void) {
  const pembeli = getCurrentPembeli();
  const penjual = await getPenjualById(pembeli.getPenjualId());
  if (penjual.pesanan) {
    const unsub = onSnapshot(collection(db, "pembeli"), (doc) => {
      const antrian: Pembeli[] = [];
      var currentPesananKey: number = 0;
      doc.forEach((sDoc) => {
        const pesanan: TPembeli = {
          id: sDoc.id,
          ...sDoc.data(),
        };
        if (pesanan.id === penjual.getId()) {
          if (pesanan.status === "Wait")
            antrian.push(
              new Pembeli(
                pesanan.id,
                pesanan.penjualId,
                (pesanan.waktu as unknown as Timestamp).toDate(),
                pesanan.status,
                pesanan.nama,
                pesanan.token
              )
            );
        }
        antrian.sort(function (a, b) {
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          const aTime = new Date(a.getWaktu()).getTime();
          const bTime = new Date(b.getWaktu()).getTime();
          return aTime - bTime;
        });

        antrian.forEach((pembeli, key) => {
          if (getCurrentPembeli().getId() === pembeli.getId())
            currentPesananKey = key;
        });
      });
      callback(currentPesananKey.toString());
    });
  }
}

export function subscribeStatus(callback: (string: String) => void) {
  const pembeliId = getCurrentPembeli().getId();
  if (pembeliId) {
    const unsub = onSnapshot(doc(db, "pembeli", pembeliId as string), (doc) => {
      const status = (doc.data() as { status: String }).status;
      callback(status);
    });
  }
}
export function redirectTunggu(router: AppRouterInstance) {
  router.push("/wait");
}
export function setCurrentPembeli(pembeli: Pembeli) {
  typeof window !== "undefined"
    ? localStorage.setItem("pembeli", JSON.stringify(pembeli))
    : null;
}
export function getCurrentPembeli() {
  const pembeliString =
    typeof window !== "undefined" ? localStorage.getItem("pembeli") : "";
  const currentPembeli: TPembeli = pembeliString
    ? JSON.parse(pembeliString)
    : new Pembeli(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      );
  return new Pembeli(
    currentPembeli.id,
    currentPembeli.penjualId,
    currentPembeli.waktu,
    currentPembeli.status,
    currentPembeli.nama,
    currentPembeli.token
  );
}
export function removeCurrentPembeli() {
  typeof window !== "undefined" ? localStorage.removeItem("pembeli") : {};
}
