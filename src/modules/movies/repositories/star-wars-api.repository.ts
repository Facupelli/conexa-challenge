import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

export interface StarWarsApiMovie {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  species: string[];
  starships: string[];
  vehicles: string[];
  characters: string[];
  planets: string[];
  url: string;
  created: string;
  edited: string;
}

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
