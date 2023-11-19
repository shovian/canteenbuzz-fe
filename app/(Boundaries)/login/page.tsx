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
  <div className="Login w-96 h-100 py-50 relative bg-white rounded-3xl">
  <img className="ellipse" alt="Ellipse" src="https://c.animaapp.com/LZc6ooCQ/img/ellipse-5.png"/>
  <div className="H1 w-52 left-[88px] top-[291px] absolute text-center text-black text-xs font-semibold font-poppins leading-none">Selamat Datang Kembali!</div>
  <div className="Frame31 left-[255px] top-[460px] absolute justify-start items-start inline-flex">
    
  </div>
  <div className="Login left-[154px] top-[249px] absolute text-center text-black text-3xl font-bold font-poppins leading-7">Login</div>
  <div className="Frame200 left-[46px] top-[555px] absolute flex-col justify-start items-center gap-3 inline-flex">
    <div className="Frame199 w-72 py-2.5 bg-sky-700 rounded-2xl justify-center items-center inline-flex">
      <div className="Masuk text-center text-white text-xl font-bold font-poppins leading-7">Masuk</div>
    </div>
    <div className="H1 w-52 text-center"><span className="text-black text-xs font-normal font-poppins leading-none">Belum punya Akun?</span><span className="text-sky-700 text-xs font-normal font-poppins leading-none"> Register disini</span></div>
  </div>
  <div className="Frame219 left-[38px] top-[348px] absolute flex-col justify-start items-start gap-2.5 inline-flex">
    <div className="Frame219 flex-col justify-start items-start gap-2.5 flex">
      <div className="Frame212 flex-col justify-start items-start gap-3.5 flex">
        <div className="Frame80 w-100 h-12 py-4 rounded-2xl justify-start items-center inline-flex">
          <input placeholder="Password" id="password" type="password" className="w-[290px] font-poppins pl-[19px] pr-[76px] pt-[15px] pb-4 bg-zinc-100 rounded-[20px] justify-start items-center inline-flex" />
        </div>
      </div>
    </div>
    <div className="Frame218 flex-col justify-start items-start gap-2.5 flex">
      <div className="Frame36 flex-col justify-start items-start gap-3.5 flex">
        <div className="Frame35 w-100 h-12 py-4 rounded-2xl justify-start items-center inline-flex">
          <input placeholder="Password" id="password" type="password" className="w-[290px] font-poppins pl-[19px] pr-[76px] pt-[15px] pb-4 bg-zinc-100 rounded-[20px] justify-start items-center inline-flex" />
        </div>
      </div>
    </div>
    <p className="H1 w-24 text-right text-orange-600 text-xs font-normal font-poppins leading-none">Lupa Password</p>
  </div>
  <img className="ellipse-2 ml-100" alt="Ellipse" src="https://c.animaapp.com/LZc6ooCQ/img/ellipse-6.png" />
</div>
    // <div className="z-10 h-screen w-screen flex flex-col justify-center items-center lg:bg-red-500">
    //   <div className="">
    //     <h1>Login</h1>
    //   </div>
    //   <div className="">Selamat Datang Kembali!</div>
    //   <form
    //     className="flex flex-col "
    //     onSubmit={(event: any) => {
    //       event.preventDefault();
    //       setUsername(event.target.username.value);
    //       setPassword(event.target.password.value);
    //     }}
    //   >
    //     <input placeholder="Username" id="username" type="text" className="w-[314px] h-[45px] pl-[19px] pr-[76px] pt-[15px] pb-4 bg-zinc-100 rounded-[20px] justify-start items-center inline-flex"/>
    //     <input placeholder="Password" id="password" type="password" className="w-[314px] h-[45px] pl-[19px] pr-[76px] pt-[15px] pb-4 bg-zinc-100 rounded-[20px] justify-start items-center inline-flex" />
    //     <button>Masuk</button>
    //   </form>
    //   <div>{errorElement ? errorElement : ""}</div>
    // </div>
  );
};
export default HalamanLogin;
