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
import { redirectMainPage } from "@/app/(Controls)/KantinHandler/handler";
import { useRouter } from "next/navigation";
const HalamanTunggu = () => {
  const router = useRouter();
  const [status, setStatus] = useState<String>();

  useEffect(() => {
    subscribePushNotification();
    subscribeStatus(setStatus);
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
    } else if (status === "Done") {
      getCurrentPembeli()
        .setStatus("Done")
        .then(() => {
          removeCurrentPembeli();
          redirectMainPage(router);
        });
    }
  }, [status]);

  return status ? (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <Script
        defer
        src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
      ></Script>
      <div>Makananmu Sedang Disiapkan!</div>
      <div>Antrian sekarang:</div>
      <div>05</div>
      <div>{navigator.vibrate.toString()}</div>
      <div>
        Kamu akan melewatkan notifikasi jika halaman ini tertutup, gunakan
        tombol Home jika ingin meninggalkan browser.
      </div>
    </div>
  ) : (
    <div>Page is loading</div>
  );
};
export default HalamanTunggu;
