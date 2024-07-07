import {
  makeRequest,
  makeValidation
} from "@/factories/domain/use-cases";

export default () => {
  return {
    request: makeRequest(),
    validation: makeValidation(),

  };
};
