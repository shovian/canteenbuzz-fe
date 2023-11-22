"use client";
import {
  getCurrentPenjualNamaKios,
  notifyPembeli,
  subscribePesanan,
} from "@/app/(Controls)/PenjualHandler/handler";
import { useEffect, useState } from "react";

const HalamanDaftarNamaPelanggan = () => {
  useEffect(() => {
    subscribePesanan(setPesanan);
  }, []);
  const [pesanan, setPesanan] = useState<String[] | undefined>();
  const currentPenjualNamaKios = getCurrentPenjualNamaKios();
  const onClickNama = (nama: String) => {
    notifyPembeli(nama);
    // console.log(nama);
  };
  return (
    pesanan && (
      <div className="h-screen w-screen ">
        <div className="h-1/4 bg-sky-800 text-white flex flex-col items-center justify-center">
          <div>{currentPenjualNamaKios}</div>
          <div className="text-red-200 text-sm">
            jumlah antrian : {pesanan.length}
          </div>
        </div>
        <div className="h-3/4  flex flex-col items-center justify-center">
          <div className="grid grid-cols-2 grid-flow-row gap-4">
            {pesanan.map((nama, key) => {
              return (
                <button
                  onClick={(e: any) => {
                    onClickNama(e.target.innerHTML);
                  }}
                  key={key}
                >
                  {nama}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    )
  );
};
export default HalamanDaftarNamaPelanggan;
