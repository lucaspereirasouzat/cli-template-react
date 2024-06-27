import { AddMutipleMultipleMethodsSeparetedByShow } from "@/domain/use-cases";
import { useMutationFactory } from "@/infra/lib/react-query";
import { makeRemoteAddMutipleMultipleMethodsSeparetedByShow } from "@/main/factories/use-cases";

export function AddMutipleMultipleMethodsSeparetedByShowRequest(input: AddMutipleMultipleMethodsSeparetedByShow.Params) {
  const remoteAddMutipleMultipleMethodsSeparetedByShow = makeRemoteAddMutipleMultipleMethodsSeparetedByShow();
  return remoteAddMutipleMultipleMethodsSeparetedByShow.show(input);
}

export function useAddMutipleMultipleMethodsSeparetedByShow() {
  return useMutationFactory(AddMutipleMultipleMethodsSeparetedByShowRequest);
}
