import { ApiProperty } from '@nestjs/swagger';

export class SyncMoviesResponseDto {
  @ApiProperty({ example: 4 })
  added: number;
  @ApiProperty({ example: 2 })
  updated: number;
  @ApiProperty({ example: 0 })
  errors: number;
}
