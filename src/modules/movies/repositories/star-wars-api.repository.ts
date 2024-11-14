import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { StarWarsApiMovie } from '../interfaces/star-wars-api-movie.interface';

@Injectable()
export class StarWarsApiRepository {
  private readonly baseUrl = 'https://swapi.dev/api/';

  constructor(private readonly httpService: HttpService) {}

  async getAllMovies(): Promise<{ results: StarWarsApiMovie[] }> {
    const response = await lastValueFrom(
      this.httpService.get<{ results: StarWarsApiMovie[] }>(
        `${this.baseUrl}films/`,
      ),
    );

    return response.data;
  }
}
