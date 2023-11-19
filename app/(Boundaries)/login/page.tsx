"use client";

import {
  isPenjualAvailable,
  redirectMainPage,
} from "@/app/(Controls)/KantinHandler/handler";
import { useRouter } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
const HalamanLogin = () => {
  const router = useRouter();
  const [errorElement, setErrorElement] = useState<ReactElement | undefined>();
  const [username, setUsername] = useState(" ");
  const [password, setPassword] = useState(" ");
  const navigate = useNavigate();
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
        if (res === true) {
          redirectMainPage(router);
        }
      });
    } else {
      createErrorElement("username dan/atau password tidak boleh kosong");
    }
  };
  return (
    <div className="z-10 h-screen w-screen flex flex-col justify-center items-center ">
      <div className="">
        <h1>Login</h1>
      </div>
      <div className="">Selamat Datang Kembali!</div>
      <form
        className="flex flex-col "
        onSubmit={(event: any) => {
          event.preventDefault();
          setUsername(event.target.username.value);
          setPassword(event.target.password.value);
        }}
      >
        <input placeholder="Username" id="username" type="text" className="w-[314px] h-[45px] pl-[19px] pr-[76px] pt-[15px] pb-4 bg-zinc-100 rounded-[20px] justify-start items-center inline-flex"/>
        <input placeholder="Password" id="password" type="password" className="w-[314px] h-[45px] pl-[19px] pr-[76px] pt-[15px] pb-4 bg-zinc-100 rounded-[20px] justify-start items-center inline-flex" />
        <button>Masuk</button>
      </form>
      <div>{errorElement ? errorElement : ""}</div>
    </div>
  );
};
export default HalamanLogin;
