"use client";
import {
  getCurrentPembeli,
  removeCurrentPembeli,
  subscribePushNotification,
  subscribeStatus,
} from "@/app/(Controls)/PembeliHandler/handler";
import { useEffect, useState } from "react";
import { Howl } from "howler";
import Script from "next/script";
const HalamanTunggu = () => {
  const [status, setStatus] = useState<String>();
  const [antrian, setAntrian] = useState<String>("05");
  const [pesananSelesai, setPesananSelesai] = useState(false);
  useEffect(() => {
    subscribePushNotification();
    subscribeStatus(setStatus);
    if (status === "Done") {
      setPesananSelesai(true);
      removeCurrentPembeli();
    }
    console.log(status, pesananSelesai);
  }, []);
  useEffect(() => {
    if (status === "Ready") {
      var sound = new Howl({
        src: ["/music/notif.mp3"],
        volume: 0.5,
        loop: true,
      });
      sound.play();
      window.navigator.vibrate && window.navigator.vibrate(2000);
    }
  }, [status]);
  console.log(status);

  return status === undefined ? (
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
  ) : (
    <div>Page is Loading</div>
  );
};
export default HalamanTunggu;
