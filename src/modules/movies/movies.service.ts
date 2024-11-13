import { Injectable } from '@nestjs/common';
import { StarWarsApiRepository } from './repositories/star-wars-api.repository';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MoviesRepository } from './repositories/movies.repository';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from '@prisma/client';

@Injectable()
export class MoviesService {
  constructor(
    private readonly starWarsApiRepository: StarWarsApiRepository,
    private readonly moviesRepository: MoviesRepository,
  ) {}

  async getAllMovies(): Promise<Movie[]> {
    return await this.moviesRepository.getAllMovies();
  }

  async getMovie(id: number): Promise<Movie> {
    return await this.moviesRepository.getMovie(id);
  }

  async createMovie(movie: CreateMovieDto): Promise<Movie> {
    return await this.moviesRepository.createMovie(movie);
  }

  async updateMovie(id: number, movie: UpdateMovieDto): Promise<Movie> {
    return await this.moviesRepository.updateMovie(id, movie);
  }

  async deleteMovie(id: number): Promise<Movie> {
    return await this.moviesRepository.deleteMovie(id);
  }
}
