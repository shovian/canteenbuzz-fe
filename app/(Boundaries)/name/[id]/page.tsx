"use client";
import { isPenjualAvailableByKios } from "@/app/(Controls)/KantinHandler/handler";
import { assignNama } from "@/app/(Controls)/PembeliHandler/handler";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const HalamanFormPengisianNama = () => {
  const router = useRouter();
  const kios = useParams().id as String;
  const [isValidKios, setIsValidKios] = useState(false);

  function createErrorElement(message: string) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        {message}
      </div>
    );
  }
  function submitNama(nama: String) {
    assignNama(nama, kios as string, router);
    // redirectTunggu(router);
  }
  useEffect(() => {
    isPenjualAvailableByKios(kios).then((valid) => {
      setIsValidKios(valid);
    });
  }, []);
  return isValidKios ? (
    <div className="h-screen w-screen ">
      <div className="h-1/4 bg-sky-800 text-white flex flex-col items-center justify-center">
        <div>Masukkan Namamu</div>
        <div className="text-red-200 text-sm">
          Masukkan nama sesuai pesananmu ya
        </div>
      </div>
      <div className="h-3/4 flex flex-col items-center justify-center">
        <form
          className="flex flex-col"
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
  ) : (
    createErrorElement("kios tidak tersedia")
  );
};
export default HalamanFormPengisianNama;
