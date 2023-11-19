const HalamanDaftarNamaPelanggan = () => {
  const pesanan = ["Yohana", "Bagas", "Krisna"];
  return (
    <div className="h-screen w-screen ">
      <div className="h-1/4 bg-sky-800 text-white flex flex-col items-center justify-center">
        <div>kantin henny</div>
        <div className="text-red-200 text-sm">
          jumlah antrian : {pesanan.length}
        </div>
      </div>
      <div className="h-3/4  flex flex-col items-center justify-center">
        <div className="grid grid-cols-2 grid-flow-row gap-4">
          {pesanan.map((order) => {
            return <button>{order}</button>;
          })}
        </div>
      </div>
    </div>
  );
};
export default HalamanDaftarNamaPelanggan;
