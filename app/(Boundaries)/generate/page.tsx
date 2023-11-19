"use client";
import { isPenjualAvailable } from "@/app/(Controls)/KantinHandler/handler";
import { ReactElement, useEffect, useState } from "react";
const HalamanLogin = () => {
  const [errorElement, setErrorElement] = useState<ReactElement | undefined>();
  const [username, setUsername] = useState(" ");
  const [password, setPassword] = useState(" ");
  useEffect(() => {
    handleLogin(username, password);
  }, [username, password]);
  useEffect(() => {
    setErrorElement(undefined);
  }, []);
  const isFormComplete = (username: String, password: String) => {
    return username !== "" && password !== "";
  };
  const createErrorElement = (message: String) => {
    setErrorElement(<div>{message}</div>);
  };
  const handleLogin = (username: String, password: String) => {
    if (isFormComplete(username, password)) {
      isPenjualAvailable(username, password).then((res) => {
        console.log(res);
      });
    } else {
      createErrorElement("username dan/atau password tidak boleh kosong");
    }
  };
  return (
<div className="HalamanGenerasiUrlDanQrcode w-96 h-96 bg-white rounded-3xl">
  <div className="Frame68 h-32 px-16 left-0 top-[44px] absolute bg-sky-700 justify-center items-center inline-flex">
    <div className="Frame69 self-stretch justify-start items-center gap-2.5 inline-flex">
      <div className="H1 w-64 text-center text-neutral-50 text-xl font-semibold font-poppins leading-none">Generate QR + URL</div>
    </div>
  </div>
  <div className="Frame203 w-80 h-11 pl-5 pr-20 pt-3.5 pb-4 left-[38px] top-[499px] absolute bg-zinc-100 rounded-2xl justify-start items-center inline-flex">
    <div className="HttpsCBuzzXyzKantinHenny text-black text-xs font-semibold font-poppins leading-none">https://c-buzz.xyz/kantin-henny</div>
  </div>
  <div className="Frame202 w-80 h-12 px-20 py-3.5 left-[42px] top-[569px] absolute bg-orange-600 rounded-lg justify-center items-center inline-flex">
    <div className="Submit text-center text-white text-base font-bold font-poppins">Download QR Code</div>
  </div>
</div>
  );
};
export default HalamanLogin;
