import { CreateValidator } from '@/domain/use-cases/create-validation'
import { makeFileStorage, makeLogger, makePath } from '@/factories/infra/gateway'

export const makeValidation = (): CreateValidator  => {
  return new CreateValidator(makeFileStorage(), makePath(), makeLogger());
}
