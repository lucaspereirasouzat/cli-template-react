import { GggShow } from "@/domain/use-cases";
import { useMutationFactory } from "@/infra/lib/react-query";
import { makeRemoteGggShow } from "@/main/factories/use-cases";

export function GggShowRequest(input: GggShow.Params) {
  const remoteGggShow = makeRemoteGggShow();
  return remoteGggShow.show(input);
}

export function useGggShow() {
  return useMutationFactory(GggShowRequest);
}
