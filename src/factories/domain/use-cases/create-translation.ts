import { CreateTranslation } from '@/domain/use-cases/create-translation'
import { makeFileStorage, makeLogger, makePath } from '@/factories/infra/gateway'

export const makeTranslation = (): CreateTranslation  => {
  return new CreateTranslation(makeFileStorage(), makePath(), makeLogger());
}
