import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Movie, Prisma } from '@prisma/client';

@Injectable()
export class MoviesRepository {
  constructor(private prisma: PrismaService) {}

  async getAllMovies(params: {
    where?: Prisma.MovieWhereInput;
  }): Promise<Movie[]> {
    const { where } = params;
    return await this.prisma.movie.findMany({
      where,
    });
  }

  async getMovie(params: {
    where: Prisma.MovieWhereUniqueInput;
  }): Promise<Movie | null> {
    const { where } = params;
    return await this.prisma.movie.findUnique({
      where,
    });
  }

  async createMovie(params: { data: Prisma.MovieCreateInput }): Promise<Movie> {
    const { data } = params;
    return await this.prisma.movie.create({
      data,
    });
  }

  async updateMovie(params: {
    where: Prisma.MovieWhereUniqueInput;
    data: Prisma.MovieUpdateInput;
  }): Promise<Movie> {
    const { where, data } = params;
    return await this.prisma.movie.update({
      where,
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  }

  async deleteMovie(params: {
    where: Prisma.MovieWhereUniqueInput;
  }): Promise<Movie> {
    const { where } = params;
    return await this.prisma.movie.update({
      where,
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
