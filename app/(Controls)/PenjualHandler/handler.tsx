import qrcode from "qrcode-generator";
import parse, { Element } from "html-react-parser";
import { ReactElement } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
type Kantin = {
  penjuals: Penjual[];
  getPenjualByCredentials?: (username: String, password: String) => Penjual;
  getPenjualById: (id: String) => Penjual;
};
function getCurrentSession() {
  return { cookies: { penjual: { id: "x76e7hufhg875rf" } } };
}
export function setNama(nama: String) {
  const kantin: Kantin = {
    penjuals: [],
    getPenjualById: function getPenjualById() {
      return this.penjuals[0];
    },
  };
  const currentPenjual: Penjual = kantin.getPenjualById(
    getCurrentSession().cookies.penjual.id
  );
}
export function redirectGeneration(router: AppRouterInstance) {
  router.push("/generate");
}
export function redirectListPage(router: AppRouterInstance) {
  router.push("/list");
}
export function convertToFile(QR: HTMLImageElement) {
  return QR.src;
}
export function generateQRURL(code: String) {
  code = code.split(" ").join("");
  const pathname =
    window.location.protocol +
    "//" +
    window.location.hostname +
    ":" +
    window.location.port +
    "/name/" +
    code;
  var qr = qrcode(4, "L");
  qr.addData(pathname);
  qr.make();
  const imgString = qr.createImgTag();
  const imgObj = new Image();
  imgObj.src = imgString.split('"')[1];

  const data = { data: { URL: pathname, QR: imgObj } };

  return data;
}
