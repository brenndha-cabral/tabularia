import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ description: 'Nome da categoria', example: 'Estratégia' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Descrição da categoria',
    example: 'Jogos de estratégia em tabuleiro',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
