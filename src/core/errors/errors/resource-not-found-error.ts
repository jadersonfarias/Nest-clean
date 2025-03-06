import { UseCaseError } from '@/core/errors/use-case-error'
export class ResourceNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Resource not found') // chama o contrutor da class que está sendo extendida
  }
}