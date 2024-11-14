import { Test, TestingModule } from '@nestjs/testing';
import { MoviesRepository } from './repositories/movies.repository';
import { MoviesService } from './movies.service';
import { StarWarsApiRepository } from './repositories/star-wars-api.repository';
import { HttpService } from '@nestjs/axios';
import { NotFoundException } from '@nestjs/common';
import {
  createMovieDto,
  expectedMovie,
  starWarsApiMoves,
} from 'test/mocks/movies.mock';

describe('MoviesService', () => {
  let moviesService: MoviesService;
  let moviesRepository: MoviesRepository;
  let starWarsApiRepository: StarWarsApiRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: MoviesRepository,
          useValue: {
            getAllMovies: jest.fn(),
            getMovie: jest.fn(),
            createMovie: jest.fn(),
            updateMovie: jest.fn(),
            deleteMovie: jest.fn(),
          },
        },
        {
          provide: StarWarsApiRepository,
          useValue: {
            getAllMovies: jest.fn(),
          },
        },
        {
          provide: HttpService,
          useValue: jest.fn(),
        },
      ],
    }).compile();

    moviesService = module.get(MoviesService);
    moviesRepository = module.get(MoviesRepository);
    starWarsApiRepository = module.get(StarWarsApiRepository);
  });

  describe('get all movies', () => {
    it('should return a list of movies', async () => {
      jest
        .spyOn(moviesRepository, 'getAllMovies')
        .mockResolvedValueOnce([expectedMovie]);

      const result = await moviesService.getAllMovies();

      expect(result).toEqual([expectedMovie]);
    });
  });

  describe('get movie by id', () => {
    it('should return a movie details', async () => {
      jest
        .spyOn(moviesRepository, 'getMovie')
        .mockResolvedValueOnce(expectedMovie);

      const result = await moviesService.getMovie(expectedMovie.id);

      expect(result).toEqual(expectedMovie);
    });

    it('should throw NotFound error if movie not found', async () => {
      jest.spyOn(moviesRepository, 'getMovie').mockResolvedValueOnce(null);

      await expect(moviesService.getMovie(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('create movie', () => {
    it('should create a movie', async () => {
      jest
        .spyOn(moviesRepository, 'createMovie')
        .mockResolvedValueOnce(expectedMovie);

      const result = await moviesService.createMovie(createMovieDto);

      expect(result.id).toBeDefined();
      expect(result.title).toEqual(expectedMovie.title);
    });
  });

  describe('update movie', () => {
    it('should update a movie', async () => {
      const updateMovieDto = createMovieDto;

      jest
        .spyOn(moviesRepository, 'updateMovie')
        .mockResolvedValueOnce(expectedMovie);

      const result = await moviesService.updateMovie(
        expectedMovie.id,
        updateMovieDto,
      );

      expect(result.id).toBeDefined();
      expect(result.title).toEqual(expectedMovie.title);
    });
  });

  describe('delete movie', () => {
    it('should delete a movie', async () => {
      jest
        .spyOn(moviesRepository, 'deleteMovie')
        .mockResolvedValueOnce(expectedMovie);

      const result = await moviesService.deleteMovie(expectedMovie.id);

      expect(result.id).toEqual(expectedMovie.id);
      expect(result.title).toEqual(expectedMovie.title);
    });
  });

  describe('sync movies', () => {
    it('should sync movies with star wars api', async () => {
      jest
        .spyOn(moviesRepository, 'getAllMovies')
        .mockResolvedValueOnce([expectedMovie]);

      jest
        .spyOn(starWarsApiRepository, 'getAllMovies')
        .mockResolvedValueOnce({ results: starWarsApiMoves });

      const syncResult = await moviesService.syncMoviesWithStarWarsApi();

      expect(syncResult.added).toEqual(3);
      expect(syncResult.updated).toEqual(0);
    });
  });
});
