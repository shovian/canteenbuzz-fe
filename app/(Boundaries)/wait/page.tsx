"use client";
import {
  getCurrentPembeli,
  removeCurrentPembeli,
  subscribeAntrian,
  subscribePushNotification,
  subscribeStatus,
} from "@/app/(Controls)/PembeliHandler/handler";
import { useEffect, useState } from "react";
import { Howl } from "howler";
import Script from "next/script";
const HalamanTunggu = () => {
  const [status, setStatus] = useState<String>();
  const [antrian, setAntrian] = useState<String>();
  const [pesananSelesai, setPesananSelesai] = useState(false);
  const sound = new Howl({
    src: ["/music/notif.mp3"],
    volume: 1,
    loop: true,
  });
  useEffect(() => {
    Howler.stop();
    subscribePushNotification();
    subscribeAntrian(setAntrian);
    subscribeStatus(setStatus);
    if (status === "Done") {
      setPesananSelesai(true);
      removeCurrentPembeli();
    }
  }, []);
  useEffect(() => {
    if (status === "Done") {
      Howler.stop();
      removeCurrentPembeli();
      setPesananSelesai(true);
    } else if (status === "Ready") {
      sound.play();
      typeof window !== "undefined"
        ? window.navigator.vibrate
          ? window.navigator.vibrate(20000)
          : {}
        : {};
    }
  }, [status]);

  return status === "Wait" || status === "Ready" ? (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <Script
        defer
        src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
      ></Script>
      <div className="text-[20px]">Makananmu Sedang Disiapkan!</div>
      <div>Antrian sekarang:</div>
      <div className="text-[60px]">{antrian}</div>
      <div className="text-red-800 text-sm text-center w-3/4">
        {
          "Kamu akan melewatkan notifikasi jika halaman ini tertutup, gunakan tombol Home jika ingin meninggalkan browser."
        }
      </div>
    </div>
  ) : pesananSelesai ? (
    <div className="w-screen h-screen flex items-center justify-center text-[32px]">
      Selamat menikmati makananmu!
    </div>
  ) : (
    <div>Page is Loading</div>
  );
};
export default HalamanTunggu;
