import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({ example: 'A New Hope' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  title: string;

  @ApiProperty({ example: 4 })
  @IsNumber()
  episodeId: number;

  @ApiProperty({
    example:
      "It is a period of civil war.\\r\\nRebel spaceships, striking\\r\\nfrom a hidden base, have won\\r\\ntheir first victory against\\r\\nthe evil Galactic Empire.\\r\\n\\r\\nDuring the battle, Rebel\\r\\nspies managed to steal secret\\r\\nplans to the Empire's\\r\\nultimate weapon, the DEATH\\r\\nSTAR, an armored space\\r\\nstation with enough power\\r\\nto destroy an entire planet.\\r\\n\\r\\nPursued by the Empire's\\r\\nsinister agents, Princess\\r\\nLeia races home aboard her\\r\\nstarship, custodian of the\\r\\nstolen plans that can save her\\r\\npeople and restore\\r\\nfreedom to the galaxy....\"",
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 10000)
  openingCrawl: string;

  @ApiProperty({ example: 'George Lucas' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  director: string;

  @ApiProperty({ example: 'Gary Kurtz, Rick McCallum' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  producer: string;

  @ApiProperty({ example: '1977-05-25' })
  @IsString()
  @IsNotEmpty()
  releaseDate: string;

  @ApiProperty({
    example: [
      'https://swapi.dev/api/people/1/',
      'https://swapi.dev/api/people/2/',
      'https://swapi.dev/api/people/3/',
    ],
  })
  @IsNotEmpty()
  characters: string[];

  @ApiProperty({
    example: [
      'https://swapi.dev/api/planets/1/',
      'https://swapi.dev/api/planets/2/',
      'https://swapi.dev/api/planets/3/',
    ],
  })
  @IsNotEmpty()
  planets: string[];

  @ApiProperty({
    example: [
      'https://swapi.dev/api/starships/2/',
      'https://swapi.dev/api/starships/3/',
      'https://swapi.dev/api/starships/5/',
    ],
  })
  @IsNotEmpty()
  starships: string[];

  @ApiProperty({
    example: [
      'https://swapi.dev/api/vehicles/4/',
      'https://swapi.dev/api/vehicles/6/',
      'https://swapi.dev/api/vehicles/7/',
    ],
  })
  @IsNotEmpty()
  vehicles: string[];

  @ApiProperty({
    example: [
      'https://swapi.dev/api/species/1/',
      'https://swapi.dev/api/species/2/',
      'https://swapi.dev/api/species/3/',
    ],
  })
  @IsNotEmpty()
  species: string[];

  @ApiProperty({ example: 'https://swapi.dev/api/films/1/' })
  @IsString()
  @IsNotEmpty()
  url: string;
}
