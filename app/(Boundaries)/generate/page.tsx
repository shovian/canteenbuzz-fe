"use client";
import {
  convertToFile,
  generateQRURL,
} from "@/app/(Controls)/PenjualHandler/handler";
import { ReactElement, useEffect, useState } from "react";
function HalamanGenerasiURLdanQRcode() {
  const [isNamaKiosInputted, setIsNamaKiosInputted] = useState<boolean>(false);
  const [URL, setURL] = useState<String>("");
  const [image, setImage] = useState<HTMLImageElement>();
  const onPressGenerate = (kios: String) => {
    const code = kios;
    const generatedData = generateQRURL(code);
    // setURL(generatedURL.url);
    setURL(generatedData.data.URL);
    setImage(generatedData.data.QR);
  };
  useEffect(() => {
    setIsNamaKiosInputted(true);
    // const generatedQR = new Image();
    // generatedQR.src = URL as string;
    // setImage(generatedQR);
  }, [URL]);
  useEffect(() => {
    setIsNamaKiosInputted(false);
  }, []);
  const createErrorElement = (message: String) => {
    const page: ReactElement = <div>{message}</div>;
    return page;
  };
  const downloadQR = (fileType: String) => {
    const fileURL = convertToFile(image ? image : new Image());
    return fileURL;
  };
  return (
    <div className="h-screen w-screen ">
      <div className="h-1/4 bg-sky-800 flex flex-col items-center justify-center text-white">
        <div>Generate QR + URL</div>
      </div>
      {isNamaKiosInputted ? (
        <div className="h-3/4 white flex flex-col items-center justify-center">
          {image && <img width={80} height={80} src={image.src}></img>}
          <input value={URL as string} readOnly></input>
          <div>
            {image && (
              <button>
                <a href={downloadQR("gif")} download>
                  Download QR Code
                </a>
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="h-3/4 flex flex-col items-center justify-center">
          <form
            onSubmit={(event: any) => {
              event.preventDefault();
              onPressGenerate(event.target.kios.value);
            }}
            className="flex flex-col"
            action="submit"
          >
            <input id="kios" type="text" placeholder="masukkan nama kios" />
            <button>Generate</button>
          </form>
        </div>
      )}
    </div>
  );
}
export default HalamanGenerasiURLdanQRcode;
