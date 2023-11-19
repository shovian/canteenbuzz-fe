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
<div className="HalamanFormPengisianNama w-96 h-96 relative bg-white rounded-3xl">
    <div className="Frame68 px-20 py-9 left-0 top-[44px] absolute bg-sky-700 flex-col justify-center items-center gap-3 inline-flex">
        <div className="Frame69 self-stretch justify-center items-center gap-2.5 inline-flex">
            <div className="H1 text-center text-neutral-50 text-xl font-semibold font-poppins leading-none">Masukkan Namamu</div>
        </div>
        <p className="MasukkanNamaSesuaiPesananmuYa w-72 text-center text-orange-200 text-sm font-bold font-poppins">Masukkan nama sesuai pesananmu ya</p>
    </div>
  {/* <div className="Frame68 px-6 pt-11 pb-10 left-0 top-[44px] absolute bg-sky-700 justify-center items-center inline-flex">
    <div className="Frame191 self-stretch flex-col justify-center items-center gap-2.5 inline-flex">
        <div className="H1 w-80 text-center text-neutral-50 text-xl font-semibold font-poppins leading-none">Masukkan Namamu</div>
      <div className="Frame177 flex-col justify-start items-center gap-4 flex">
        <div className="MasukkanNamaSesuaiPesananmuYa w-72 text-center text-orange-200 text-sm font-bold font-poppins">Masukkan nama sesuai pesananmu ya</div>
      </div>
    </div>
  </div> */}
  <div className="Frame191 left-[38px] top-[363px] absolute flex-col justify-start items-start gap-3.5 inline-flex">
    <div className="Frame31 w-80 h-12 pl-5 pr-44 py-4 bg-zinc-100 rounded-2xl justify-start items-center inline-flex">
      <div className="Username text-black text-xs font-semibold font-poppins leading-none">Masukkan Nama</div>
    </div>
  </div>
  <div className="Frame202 w-80 h-12 py-3.5 left-[42px] top-[431px] absolute bg-orange-600 rounded-lg justify-center items-center inline-flex">
    <div className="Submit text-center text-white text-base font-bold font-poppins">Submit</div>
  </div>
</div>
  );
};
export default HalamanLogin;
