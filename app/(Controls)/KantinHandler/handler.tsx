import { getPenjualByCredentials } from "@/app/(Entities)/Kantin/entity";

export async function isPenjualAvailable(username: String, password: String) {
  const penjual = await getPenjualByCredentials(username, password);
  return penjual === true;
}
