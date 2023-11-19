"use client";
import { useParams } from "next/navigation";

const HalamanFormPengisianNama = () => {
  const id = useParams().id;
  return (
    <div className="h-screen w-screen bg-red-500">
      <div className="h-1/4 bg-green-500 flex flex-col items-center justify-center">
        <div>Masukkan Namamu</div>
        <div>Masukkan nama sesuai pesananmu ya</div>
      </div>
      <div className="h-3/4 bg-sky-500 flex flex-col items-center justify-center">
        <div>masukkan nama</div>
        <div>
          <button>Submit</button>
        </div>
      </div>
    </div>
  );
};
export default HalamanFormPengisianNama;
