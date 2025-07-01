import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'Nome da jogo', example: 'Banco Imobiliário' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Descrição do jogo',
    example:
      'O Banco Imobiliário é um jogo de tabuleiro clássico onde os jogadores lançam os dados, movem seus peões pelo tabuleiro e compram propriedades como bairros, casas e hotéis. O objetivo é acumular riqueza, evitando a falência e se tornar o jogador mais rico. ',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Nome da fabricante ou editora',
    example: 'Estrela',
  })
  @IsNotEmpty()
  @IsString()
  publisher: string;

  @ApiProperty({ description: 'Preço', example: '120.00' })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'Mínimo de jogadores', example: '2' })
  @IsNotEmpty()
  @IsNumber()
  players_min: number;

  @ApiProperty({ description: 'Máximo de jogadores', example: '6' })
  @IsNotEmpty()
  @IsNumber()
  players_max: number;

  @ApiProperty({ description: 'Idade recomendada', example: '8' })
  @IsNotEmpty()
  @IsNumber()
  age_rating: number;

  @ApiProperty({ description: 'Quantidade em estoque', example: '37' })
  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @ApiProperty({ description: 'Ano de lançamento', example: '1944' })
  @IsNotEmpty()
  @IsNumber()
  release_year: number;

  @ApiProperty({ description: 'Categoria relacionada', example: '1' })
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;
}
