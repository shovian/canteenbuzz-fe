"use client";
import { redirectTunggu } from "@/app/(Controls)/PembeliHandler/handler";
import { setNama } from "@/app/(Controls)/PenjualHandler/handler";
import { useParams, useRouter } from "next/navigation";

const HalamanFormPengisianNama = () => {
  const router = useRouter();
  const id = useParams().id;
  function submitNama(nama: String) {
    setNama(nama);
    redirectTunggu(router);
  }
  return (
    <div className="h-screen w-screen ">
      <div className="h-1/4 bg-sky-800 text-white flex flex-col items-center justify-center">
        <div>Masukkan Namamu</div>
        <div className="text-red-200 text-sm">
          Masukkan nama sesuai pesananmu ya
        </div>
      </div>
      <div className="h-3/4 flex flex-col items-center justify-center">
        <input placeholder="Masukkan Nama"></input>
        <div>
          <button>Submit</button>
        </div>
      </div>
    </div>
  );
};
export default HalamanFormPengisianNama;
