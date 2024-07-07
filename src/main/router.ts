import {
  makeRequest,
  makeValidation,
  makeTranslation
} from "@/factories/domain/use-cases";

export default () => {
  return {
    request: makeRequest(),
    validation: makeValidation(),
    translation: makeTranslation()
  };
};
