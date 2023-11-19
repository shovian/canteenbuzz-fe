"use client";
import {
  redirectGeneration,
  redirectListPage,
} from "@/app/(Controls)/PenjualHandler/handler";
import { useRouter } from "next/navigation";

const HalamanUtamaPenjual = () => {
  const router = useRouter();
  function showGenerationPage() {
    redirectGeneration(router);
  }
  function showListPage() {
    redirectListPage(router);
  }
  return (
    <div className="h-screen w-screen ">
      <div className="h-1/4 bg-sky-800 text-white flex flex-col items-center justify-center">
        <div>kantin henny</div>
        <div>jumlah antrian : 12</div>
      </div>
      <div className="h-3/4  flex flex-col items-center justify-center">
        <div>
          <button onClick={() => showGenerationPage()}>gen url qr</button>
        </div>
        <div>
          <button>lih daftar pelanggan</button>
        </div>
      </div>
    </div>
  );
};
export default HalamanUtamaPenjual;
