import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ description: 'Name of the category' })
  name: string;

  @ApiProperty({ description: 'ID of the parent category', nullable: true })
  parentCategoryId?: number;
}
