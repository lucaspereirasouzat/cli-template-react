import { AaaaShow } from "@/domain/use-cases";
import { useMutationFactory } from "@/infra/lib/react-query";
import { makeRemoteAaaaShow } from "@/main/factories/use-cases";

export function AaaaShowRequest(input: AaaaShow.Params) {
  const remoteAaaaShow = makeRemoteAaaaShow();
  return remoteAaaaShow.show(input);
}

export function useAaaaShow() {
  return useMutationFactory(AaaaShowRequest);
}
