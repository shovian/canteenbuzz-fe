"use client";
import {
  assignNama,
  redirectTunggu,
} from "@/app/(Controls)/PembeliHandler/handler";
import { useParams, useRouter } from "next/navigation";

const HalamanFormPengisianNama = () => {
  const router = useRouter();
  const kios = useParams().id;
  function submitNama(nama: String) {
    assignNama(nama, kios as string);
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
        <form
          onSubmit={(e: any) => {
            e.preventDefault();
            submitNama(e.target.nama.value);
          }}
        >
          <input id="nama" placeholder="Masukkan Nama"></input>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};
export default HalamanFormPengisianNama;
