"use client";
import { subscribeStatus } from "@/app/(Controls)/PembeliHandler/handler";
import { useEffect, useState } from "react";
import { Howl, Howler } from "howler";
const HalamanTunggu = () => {
  const [status, setStatus] = useState<String>();
  useEffect(() => {}, []);
  useEffect(() => {
    subscribeStatus(setStatus);

    if (status === "Ready") {
      var sound = new Howl({
        src: ["/music/notif.mp3"],
        volume: 0.5,
        loop: true,
      });
      sound.play();
      navigator.vibrate(200);
    }
  }, [status]);
  return status ? (
    <div className="h-screen w-screen bg-red-500 flex flex-col items-center justify-center">
      <div>makananmu sedang </div>
      <div>antrian sekarang:</div>
      <div>05</div>
    </div>
  ) : (
    <div>page is loading</div>
  );
};
export default HalamanTunggu;
