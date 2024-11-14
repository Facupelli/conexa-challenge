import { ApiProperty } from '@nestjs/swagger';

export class CustomResponse<T> {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty()
  data: T;
}
