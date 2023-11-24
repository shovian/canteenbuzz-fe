import { Pembeli } from "@/app/(Entities)/Pembeli/entity";
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
    return node.nama === nama;
  });

  return new Pembeli(pembeli ? pembeli[0] : undefined);
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

export function subscribeStatus(
  callback: Dispatch<SetStateAction<String | undefined>>
) {
  const pembeliId = getCurrentPembeli().id;
  if (pembeliId) {
    const unsub = onSnapshot(doc(db, "pembeli", pembeliId as string), (doc) => {
      const status = (doc.data() as { status: String }).status;
      callback(status);
    });
  }
}
export async function subscribeAntrian(
  callback: Dispatch<SetStateAction<String | undefined>>
) {
  const pembeli = getCurrentPembeli();
  const penjual = await getPenjualById(pembeli.penjualId!);
  if (penjual.pesanan) {
    const unsub = onSnapshot(collection(db, "pembeli"), (doc) => {
      const antrian: Pembeli[] = [];
      var currentPesananKey: number = 0;
      doc.forEach((sDoc) => {
        const pesanan: Pembeli = {
          id: sDoc.id,
          ...sDoc.data(),
        } as unknown as Pembeli;
        if (pesanan.penjualId === penjual.getId()) {
          if (pesanan.status === "Wait")
            antrian.push(
              new Pembeli({
                ...pesanan,
                waktu: (pesanan.waktu as unknown as Timestamp).toDate(),
              } as Pembeli)
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
          if (getCurrentPembeli().id === pembeli.id) currentPesananKey = key;
        });
      });
      callback(currentPesananKey.toString());
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
  const currentPembeli: Pembeli = pembeliString
    ? new Pembeli(JSON.parse(pembeliString))
    : new Pembeli(undefined);
  return currentPembeli;
}
export function removeCurrentPembeli() {
  typeof window !== "undefined" ? localStorage.removeItem("pembeli") : {};
}
