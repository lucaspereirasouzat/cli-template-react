import {
  makeRequest,
} from "@/factories/domain/use-cases";

export default () => {
  return {
    request: makeRequest(),
  };
};
