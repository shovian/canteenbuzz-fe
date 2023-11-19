import { getPenjualByCredentials } from "@/app/(Entities)/Kantin/entity";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { NextRouter } from "next/router";

export function redirectMainPage(router: AppRouterInstance) {
  router.push("/main");
}
export async function isPenjualAvailable(username: String, password: String) {
  const penjual = await getPenjualByCredentials(username, password);
  return penjual === true;
}
