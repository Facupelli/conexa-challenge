import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { Movie } from '@prisma/client';

@Injectable()
export class MoviesRepository {
  constructor(private prisma: PrismaService) {}

  async getAllMovies(): Promise<Movie[]> {
    return await this.prisma.movie.findMany({
      where: {
        deletedAt: null,
      },
    });
  }

  async getMovie(id: number): Promise<Movie | null> {
    return await this.prisma.movie.findUnique({
      where: {
        id: id,
      },
    });
  }

  async createMovie(
    movie: CreateMovieDto & { externalId?: number },
  ): Promise<Movie> {
    return await this.prisma.movie.create({
      data: movie,
    });
  }

  async updateMovie(id: number, movie: UpdateMovieDto): Promise<Movie> {
    return await this.prisma.movie.update({
      where: {
        id,
      },
      data: {
        ...movie,
        updatedAt: new Date(),
      },
    });
  }

  async deleteMovie(id: number): Promise<Movie> {
    return await this.prisma.movie.update({
      where: {
        id: id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
