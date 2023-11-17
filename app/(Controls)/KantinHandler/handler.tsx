export function isPenjualAvailable(username: String, password: String) {
  const penjual = kantin.getPenjualByCredentials(username, password);
  if (penjual !== undefined) return true;
  else return false;
}
