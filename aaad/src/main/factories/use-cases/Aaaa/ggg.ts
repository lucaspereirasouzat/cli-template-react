import { RemoteGgg } from "@/data";
import { Ggg } from "@/domain/use-cases";
import { makeApiUrl } from "@/main/factories/http";
import { makeAuthorizeHttpClientDecorator } from "@/main/factories/decorators";

export const makeRemoteGgg = (): Ggg =>
  new RemoteGgg(makeApiUrl("/contact/contacts/{id}"), makeAuthorizeHttpClientDecorator());
