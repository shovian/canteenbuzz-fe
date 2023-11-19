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
    

<div className="HalamanTunggu w-96 h-96 relative bg-white rounded-3xl">
  <div className="Frame167 w-44 h-44 left-[-49px] top-[-20px] absolute bg-orange-600 rounded-full" />
  <div className="Frame166 w-64 h-64 left-[150px] top-[49px] absolute bg-orange-100 rounded-full" />
  <div className="Frame195 left-[41px] top-[172px] absolute flex-col justify-start items-center gap-1 inline-flex">
    <div className="MakananmuSedangDisiapkan w-80 text-center text-sky-800 text-2xl font-bold font-poppins">Makananmu Sedang Disiapkan</div>
  </div>
  <div className="AntrianSekarang w-72 left-[43px] top-[269px] absolute text-center text-orange-600 text-xs font-normal font-poppins">Antrian sekarang: </div>
  <div className=" left-[171px] top-[289px] absolute text-center text-sky-800 text-3xl font-bold font-poppins">05</div>
  <div className="DataManagementRecieptDocumentPaperPageWomanPeoplePages w-80 h-80 p-1.5 left-[32px] top-[311px] absolute justify-center items-center inline-flex">
    <img
        className="img-2"
        alt="Data management"
        src="https://c.animaapp.com/xf0NctPi/img/data-management---reciept--document--paper--page--woman--people--1@2x.png"
      />
  </div>
  <div className="Frame167 w-6 h-6 left-[17px] top-[245px] absolute bg-sky-900 rounded-full" />
  <div className="Frame196 w-6 h-6 left-[43px] top-[266px] absolute bg-sky-200 rounded-full" />
  <div className="Frame197 w-6 h-6 left-[19px] top-[289px] absolute bg-cyan-600 rounded-full" />
  <div className="Frame206 w-40 h-12 py-3 left-[116px] top-[670px] absolute bg-orange-600 rounded-lg justify-center items-center inline-flex">
    <div className="Yohana text-center text-white text-base font-bold font-poppins">OK</div>
  </div>
</div>
  );
};
export default HalamanLogin;
