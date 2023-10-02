import { ApiResponse, ApiResponseOptions } from '@nestjs/swagger'
import { ResponseDTO } from '../dtos'

export function SwaggerDoc(decorators: Array<MethodDecorator>) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    decorators.forEach((decorator) => decorator(target, key, descriptor))
  }
}

type SwaggerResponseDTO = Omit<ApiResponseOptions, 'status' | 'content'> & { content: ResponseDTO; isArray?: boolean }
export function SwaggerResponseDTO(options: SwaggerResponseDTO) {
  return ApiResponse({
    ...options,
    status: options.content.statusCode,
    content: {
      'application/json': {
        example: options.content,
      },
    },
  })
}
