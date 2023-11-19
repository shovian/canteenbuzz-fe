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
<div className="HalamanUtamaPenjual w-96 h-96 relative bg-white rounded-3xl">
  <div className="Frame68 px-20 py-9 left-0 top-[44px] absolute bg-sky-700 flex-col justify-center items-center gap-3 inline-flex">
    <div className="Frame69 self-stretch justify-center items-center gap-2.5 inline-flex">
      <div className="H1 w-40 text-center text-neutral-50 text-xl font-semibold font-poppins leading-none">Kantin Henny</div>
    </div>
    <div className="JumlahAntrian12 text-center text-orange-200 text-2xl font-bold font-poppins leading-7">Jumlah Antrian: 12</div>
  </div>
  <div className="Frame202 w-80 h-12 px-14 py-3.5 left-[44px] top-[363px] absolute bg-orange-600 rounded-lg justify-center items-center inline-flex">
    <div className="Submit text-center text-white text-base font-bold font-poppins">Generate URL + QR Code</div>
  </div>
  <div className="Frame202 w-80 h-12 px-14 py-3.5 left-[42px] top-[433px] absolute bg-orange-600 rounded-lg justify-center items-center inline-flex">
    <div className="Submit text-center text-white text-base font-bold font-poppins">Lihat Daftar Pelanggan</div>
  </div>
  
</div>
  );
};
export default HalamanLogin;
