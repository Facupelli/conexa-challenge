import { Injectable, Logger } from '@nestjs/common';
import {
  StarWarsApiMovie,
  StarWarsApiRepository,
} from './repositories/star-wars-api.repository';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MoviesRepository } from './repositories/movies.repository';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from '@prisma/client';

@Injectable()
export class MoviesService {
  private readonly logger = new Logger(MoviesService.name);

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

  async syncMoviesWithStarWarsApi(): Promise<{
    added: number;
    updated: number;
    errors: number;
  }> {
    const stats = { added: 0, updated: 0, errors: 0 };

    const starWarsApiMovies: { results: StarWarsApiMovie[] } =
      await this.starWarsApiRepository.getAllMovies();
    const localMovies: Movie[] = await this.moviesRepository.getAllMovies();

    for (const swMovie of starWarsApiMovies.results) {
      const externalId = parseInt(swMovie.url.split('/').filter(Boolean).pop());

      const existingMovie = localMovies.find(
        (movie) => movie.externalId === externalId,
      );
      const mappedMovie = this.mapStarWarsMovie(swMovie, externalId);

      if (existingMovie) {
        await this.moviesRepository.updateMovie(existingMovie.id, mappedMovie);
        stats.updated++;
        this.logger.debug(`Updated movie: ${mappedMovie.title}`);
      } else {
        await this.moviesRepository.createMovie(mappedMovie);
        stats.added++;
        this.logger.debug(`Added new movie: ${mappedMovie.title}`);
      }
    }

    this.logger.log(
      `Sync completed. Added: ${stats.added}, Updated: ${stats.updated}, Errors: ${stats.errors}`,
    );
    return stats;
  }

  private mapStarWarsMovie(
    swMovie: StarWarsApiMovie,
    externalId: number,
  ): Omit<Movie, 'id' | 'createdAt' | 'updatedAt'> {
    return {
      externalId,
      title: swMovie.title,
      episodeId: swMovie.episode_id,
      openingCrawl: swMovie.opening_crawl,
      director: swMovie.director,
      producer: swMovie.producer,
      releaseDate: swMovie.release_date,
      species: swMovie.species,
      starships: swMovie.starships,
      vehicles: swMovie.vehicles,
      characters: swMovie.characters,
      planets: swMovie.planets,
      url: swMovie.url,
    };
  }
}
