import { HttpClient, HttpStatusCode } from "@/data/protocols/http";
import { AaaaNotFoundError, InvalidCredentialsError, UnexpectedError } from "@/domain/error";
import { AaaaShow } from "@/domain/use-cases";

export class RemoteAaaaShow implements AaaaShow {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteAaaaShow.Model>
  ) {}

  async show({id}: AaaaShow.Params): Promise<AaaaShow.Result> {
    const httpResponse = await this.httpClient.request({
      url: this.url.replace("{id}", id),
      method: "get"
    });
    const RemoteAaaaShow = httpResponse.body || ({} as RemoteAaaaShow.Model);

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return RemoteAaaaShow;
      case HttpStatusCode.notFound:
        throw new AaaaNotFoundError()
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError();
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteAaaaShow {
  export type Params = AaaaShow.Params;
  export type Model = AaaaShow.Result;
}
