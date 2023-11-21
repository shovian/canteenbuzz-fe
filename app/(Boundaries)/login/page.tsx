"use client";
import { redirectMainPage } from "@/app/(Controls)/KantinHandler/handler";
import {
  isPenjualAvailable,
  isPenjualLoggedAndAvailable,
  removeLoggedPenjual,
  setLoggedPenjualByCredentials,
} from "@/app/(Controls)/PenjualHandler/handler";
import { useRouter } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";

const HalamanLogin = () => {
  const router = useRouter();
  const [errorElement, setErrorElement] = useState<ReactElement | undefined>();
  const [loadPage, setLoadPage] = useState(false);

  useEffect(() => {
    setErrorElement(undefined);
    isPenjualLoggedAndAvailable().then((isLoggedAndAvailable) => {
      if (isLoggedAndAvailable) {
        redirectMainPage(router);
      } else {
        removeLoggedPenjual();
        setLoadPage(true);
      }
    });
  }, []);
  const isFormComplete = (username: String, password: String) => {
    return username !== "" && password !== "";
  };
  const createErrorElement = (message: String) => {
    setErrorElement(<div>{message}</div>);
  };
  const submitLogin = (username: String, password: String) => {
    if (isFormComplete(username, password)) {
      isPenjualAvailable(username, password).then((isAvailable) => {
        if (isAvailable === true) {
          setLoggedPenjualByCredentials(username, password);
          redirectMainPage(router);
        } else createErrorElement("Username atau password salah");
      });
    } else {
      createErrorElement("username dan/atau password tidak boleh kosong");
    }
  };
  return loadPage ? (
    <div className="z-10 h-screen w-screen flex flex-col justify-center items-center ">
      <div className="">
        <h1 className="text-lg">Login</h1>
      </div>
      <div className="">Selamat Datang Kembali!</div>
      <form
        className="flex flex-col "
        onSubmit={(event: any) => {
          event.preventDefault();
          submitLogin(event.target.username.value, event.target.password.value);
        }}
      >
        <input
          placeholder="Username"
          id="username"
          type="text"
          className="w-[314px] h-[45px] pl-[19px] pr-[76px] pt-[15px] pb-4 bg-zinc-100 rounded-[20px] justify-start items-center inline-flex"
        />
        <input
          placeholder="Password"
          id="password"
          type="password"
          className="w-[314px] h-[45px] pl-[19px] pr-[76px] pt-[15px] pb-4 bg-zinc-100 rounded-[20px] justify-start items-center inline-flex"
        />
        <button>Masuk</button>
      </form>
      <div>{errorElement ? errorElement : ""}</div>
    </div>
  ) : (
    <div />
  );
};
export default HalamanLogin;
