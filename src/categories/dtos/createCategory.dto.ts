import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ description: 'Nome da categoria', example: 'Estratégia' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Descrição da categoria',
    example:
      'Jogos que exigem planejamento e tomada de decisões táticas para vencer.',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
