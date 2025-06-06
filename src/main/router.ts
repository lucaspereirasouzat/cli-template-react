import {
  makeRequest,
  makeValidation,
  makeTranslation,
  makeError
} from "@/factories/domain/use-cases";

export default () => {
  return {
    request: makeRequest(),
    validation: makeValidation(),
    translation: makeTranslation(),
    error: makeError()
  };
};
