"use client";
import Image from "next/image";
import bgLogin from "./Frame/bgLogin.png";
import HalamanLogin from "./(Boundaries)/login/page";
export default function Home() {
  return (
    <main className="flex h-screen ">
      <HalamanLogin></HalamanLogin>
    </main>
  );
}
