import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function redirectTunggu(router: AppRouterInstance) {
  router.push("/wait");
}
