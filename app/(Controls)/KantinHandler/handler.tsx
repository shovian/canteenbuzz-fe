import { Kantin } from "@/app/(Entities)/Kantin/entity";
import { Penjual } from "@/app/(Entities)/Penjual/entity";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function redirectMainPage(router: AppRouterInstance) {
  router.push("/main");
}

export async function getPenjualByKios(kios: String) {
  const penjual: Penjual = await Kantin.build().then((kantin) => {
    return kantin.getPenjualByKios(kios);
  });

  return new Penjual(penjual);
}
export async function getPenjualById(id: String) {
  const penjual: Penjual = await Kantin.build().then((kantin) => {
    return kantin.getPenjualById(id);
  });

  return new Penjual(penjual);
}
export async function getPenjualByCredentials(
  username: String,
  password: String
) {
  const penjual: Penjual = await Kantin.build().then((kantin) => {
    return kantin.getPenjualByCredentials(username, password);
  });

  const res = penjual ? new Penjual(penjual) : undefined;
  return res;
}
