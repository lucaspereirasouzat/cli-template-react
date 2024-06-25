import { HttpClient, HttpStatusCode } from "@/data/protocols/http";
import { GggNotFoundError, InvalidCredentialsError, UnexpectedError } from "@/domain/error";
import { GggShow } from "@/domain/use-cases";

export class RemoteGggShow implements GggShow {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteGggShow.Model>
  ) {}

  async show({id}: GggShow.Params): Promise<GggShow.Result> {
    const httpResponse = await this.httpClient.request({
      url: this.url.replace("{id}", id),
      method: "get"
    });
    const RemoteGggShow = httpResponse.body || ({} as RemoteGggShow.Model);

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return RemoteGggShow;
      case HttpStatusCode.notFound:
        throw new GggNotFoundError()
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError();
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteGggShow {
  export type Params = GggShow.Params;
  export type Model = GggShow.Result;
}
