const HalamanDaftarNamaPelanggan = () => {
  return (
    <div className="h-screen w-screen bg-red-500">
      <div className="h-1/4 bg-green-500 flex flex-col items-center justify-center">
        <div>kantin henny</div>
        <div>jumlah antrian : 12</div>
      </div>
      <div className="h-3/4 bg-sky-500 flex flex-col items-center justify-center">
        <div className="grid grid-cols-2 grid-flow-row gap-4">
          <button>pelanggan 1</button>
          <button>pelanggan 2</button>
          <button>pelanggan 3</button>
          <button>pelanggan 4</button>
        </div>
      </div>
    </div>
  );
};
export default HalamanDaftarNamaPelanggan;
