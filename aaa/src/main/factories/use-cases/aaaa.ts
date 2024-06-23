import { RemoteAaaa } from "@/data";
import { Aaaa } from "@/domain/use-cases";
import { makeApiUrl } from "@/main/factories/http";
import { makeAuthorizeHttpClientDecorator } from "@/main/factories/decorators";

export const makeRemoteAaaa = (): Aaaa =>
  new RemoteAaaa(makeApiUrl("/contact/contacts/{id}"), makeAuthorizeHttpClientDecorator());
