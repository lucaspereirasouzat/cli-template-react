import { CreateRequest } from "@/domain/use-cases/create-request";
import {
  makeFileStorage,
  makeLogger,
  makePath,
} from "@/factories/infra/gateway";

export const makeRequest = (): CreateRequest => {
  return new CreateRequest(makeFileStorage(), makePath(), makeLogger());
};
