import { type Type, applyDecorators } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiExtraModels,
  getSchemaPath,
} from '@nestjs/swagger';
import { CustomResponse } from '../dto/response.dto';

interface ApiResponseOptions<TModel> {
  type: TModel;
  isArray?: boolean;
}

export const ApiCreatedCustomResponse = <TModel extends Type<any>>(
  options: ApiResponseOptions<TModel>,
) => {
  const { type, isArray } = options;

  return applyDecorators(
    ApiExtraModels(CustomResponse, type),
    ApiCreatedResponse({
      schema: {
        title: `CustomResponseOf${type.name}`,
        allOf: [
          { $ref: getSchemaPath(CustomResponse) },
          {
            properties: {
              data: isArray
                ? {
                    type: 'array',
                    items: { $ref: getSchemaPath(type) },
                  }
                : {
                    type: 'object',
                    $ref: getSchemaPath(type),
                  },
            },
          },
        ],
      },
    }),
  );
};
