import { RemoteAddMutipleMultipleMethodsSeparetedBy } from "@/data";
import { AddMutipleMultipleMethodsSeparetedBy } from "@/domain/use-cases";
import { makeApiUrl } from "@/main/factories/http";
import { makeAuthorizeHttpClientDecorator } from "@/main/factories/decorators";

export const makeRemoteAddMutipleMultipleMethodsSeparetedBy = (): AddMutipleMultipleMethodsSeparetedBy =>
  new RemoteAddMutipleMultipleMethodsSeparetedBy(makeApiUrl("/contact/contacts/{id}"), makeAuthorizeHttpClientDecorator());
