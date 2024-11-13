import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { StarWarsApiRepository } from './repositories/star-wars-api.repository';
import { HttpModule } from '@nestjs/axios';
import { MoviesRepository } from './repositories/movies.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [HttpModule, PrismaModule],
  controllers: [MoviesController],
  providers: [MoviesRepository, StarWarsApiRepository, MoviesService],
})
export class MoviesModule {}
