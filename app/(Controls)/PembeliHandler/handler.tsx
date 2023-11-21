import { Pembeli } from "@/app/(Entities)/Pembeli/entity";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { getPenjualByKios } from "../KantinHandler/handler";
import { Penjual, db } from "@/app/(Entities)/Penjual/entity";
import { addPesanan } from "../PenjualHandler/handler";
import { Dispatch, SetStateAction } from "react";
import { doc, onSnapshot } from "firebase/firestore";

export function subscribeStatus(
  callback: Dispatch<SetStateAction<String | undefined>>
) {
  if ("PushManager" in window) {
    // Request permission for push notifications
    Notification.requestPermission()
      .then(function (permission) {
        if (permission === "granted") {
          // Permission is granted, you can now subscribe the user to receive push notifications
          const pembeli: Pembeli = getCurrentPembeli();
          const unsub = onSnapshot(
            doc(db, "pembeli", pembeli.id as string),
            (doc) => {
              const status = (doc.data() as { status: String }).status;
              callback(status);
            }
          );
        } else {
          // Permission is denied
          console.log("Push notification permission denied");
        }
      })
      .catch(function (error) {
        console.error("Error requesting push notification permission:", error);
      });
  } else {
    console.warn("Push notifications are not supported in this browser");
  }
}
export function redirectTunggu(router: AppRouterInstance) {
  router.push("/wait");
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
export async function notifyPembeli(nama: String) {}

export function setCurrentPembeli(pembeli: Pembeli) {
  typeof window !== "undefined"
    ? localStorage.setItem("pembeli", JSON.stringify(pembeli))
    : null;
}
export function getCurrentPembeli() {
  const pembeliString =
    typeof window !== "undefined" ? localStorage.getItem("pembeli") : "";
  const currentPembeli: Pembeli = pembeliString
    ? JSON.parse(pembeliString)
    : new Pembeli(undefined);
  return currentPembeli;
}
export async function getPembeliByNamaAndKios(nama: String, kios: String) {
  const penjual: Penjual | undefined = await getPenjualByKios(kios);
  const pembeli = penjual?.pesanan.filter((node) => {
    return node.nama === nama;
  });
  console.log("pembelihandler", pembeli);

  return new Pembeli(pembeli ? pembeli[0] : undefined);
}
