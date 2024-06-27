import { HttpClient, HttpStatusCode } from "@/data/protocols/http";
import { AddMutipleMultipleMethodsSeparetedByNotFoundError, InvalidCredentialsError, UnexpectedError } from "@/domain/error";
import { AddMutipleMultipleMethodsSeparetedByShow } from "@/domain/use-cases";

export class RemoteAddMutipleMultipleMethodsSeparetedByShow implements AddMutipleMultipleMethodsSeparetedByShow {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteAddMutipleMultipleMethodsSeparetedByShow.Model>
  ) {}

  async show({id}: AddMutipleMultipleMethodsSeparetedByShow.Params): Promise<AddMutipleMultipleMethodsSeparetedByShow.Result> {
    const httpResponse = await this.httpClient.request({
      url: this.url.replace("{id}", id),
      method: "get"
    });
    const RemoteAddMutipleMultipleMethodsSeparetedByShow = httpResponse.body || ({} as RemoteAddMutipleMultipleMethodsSeparetedByShow.Model);

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return RemoteAddMutipleMultipleMethodsSeparetedByShow;
      case HttpStatusCode.notFound:
        throw new AddMutipleMultipleMethodsSeparetedByNotFoundError()
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError();
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteAddMutipleMultipleMethodsSeparetedByShow {
  export type Params = AddMutipleMultipleMethodsSeparetedByShow.Params;
  export type Model = AddMutipleMultipleMethodsSeparetedByShow.Result;
}
