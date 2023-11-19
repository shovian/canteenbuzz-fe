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
<div className="HalamanDaftarNamaPelanggan w-100 h-96 relative bg-white rounded-3xl">
  <div className="Frame68 px-20 py-9 left-0 top-[44px] absolute bg-sky-700 flex-col justify-center items-center gap-3 inline-flex">
    <div className="Frame69 self-stretch justify-center items-center gap-2.5 inline-flex">
      <div className="H1 w-40 text-center text-neutral-50 text-xl font-semibold font-poppins leading-none">Kantin Henny</div>
    </div>
    <div className="JumlahAntrian6 text-center text-orange-200 text-2xl font-bold font-poppins leading-7">Jumlah Antrian: 6</div>
  </div>
  <div className="Frame211 left-[15px] top-[326px] absolute flex-col justify-center items-center gap-12 inline-flex">
    <div className="Frame209 justify-start items-start gap-7 inline-flex">
      <div className="Frame207 flex-col justify-start items-start gap-7 inline-flex">
        <div className="Frame206 w-40 h-12 pl-12 pr-11 py-3 bg-orange-600 rounded-lg justify-center items-center inline-flex">
          <a href="#" className="Yohana text-center text-white text-base font-bold font-poppins">Yohana</a>
        </div>
        <div className="Frame206 w-40 h-12 pl-14 pr-12 py-3 bg-orange-600 rounded-lg justify-center items-center inline-flex">
          <a href="#" className="Yohana text-center text-white text-base font-bold font-poppins">Bagas</a>
        </div>
        <div className="Frame206 w-40 h-12 pl-14 pr-12 py-3 bg-orange-600 rounded-lg justify-center items-center inline-flex">
          <a href="#" className="Yohana text-center text-white text-base font-bold font-poppins">Fahrul</a>
        </div>
      </div>
      <div className="Frame208 flex-col justify-start items-start gap-7 inline-flex">
        <div className="Frame206 w-40 h-12 px-12 py-3 bg-orange-600 rounded-lg justify-center items-center inline-flex">
          <a href="#" className="Yohana text-center text-white text-base font-bold font-poppins">Krisna</a>
        </div>
        <div className="Frame206 w-40 h-12 px-11 py-3 bg-orange-600 rounded-lg justify-center items-center inline-flex">
          <a href="#" className="Yohana text-center text-white text-base font-bold font-poppins">Shovian</a>
        </div>
        <div className="Frame206 w-40 h-12 py-3 bg-orange-600 rounded-lg justify-center items-center inline-flex">
          <a href="#" className="Yohana text-center text-white text-base font-bold font-poppins">Joko</a>
        </div>
      </div>
    </div>
    <div className="Frame210 w-64 h-12 px-8 py-3.5 rounded-lg border-2 border-orange-600 justify-center items-center inline-flex">
      <div className="KembaliKeHalamanUtama text-center text-orange-600 text-xs font-bold font-poppins">Kembali ke Halaman Utama</div>
    </div>
  </div>
</div>
  );
};
export default HalamanLogin;
