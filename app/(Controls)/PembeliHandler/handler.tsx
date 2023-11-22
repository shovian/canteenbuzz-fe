import { Pembeli } from "@/app/(Entities)/Pembeli/entity";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { getPenjualByKios } from "../KantinHandler/handler";
import { Penjual, db } from "@/app/(Entities)/Penjual/entity";
import { addPesanan } from "../PenjualHandler/handler";
import { Dispatch, SetStateAction } from "react";
import { doc, onSnapshot } from "firebase/firestore";
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
  const pembeli: Pembeli = getCurrentPembeli();
  const unsub = onSnapshot(doc(db, "pembeli", pembeli.id as string), (doc) => {
    const status = (doc.data() as { status: String }).status;
    callback(status);
  });
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
