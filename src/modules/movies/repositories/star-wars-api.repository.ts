import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StarWarsApiRepository {
  private readonly baseUrl = 'https://swapi.dev/api/';

  constructor(private readonly httpService: HttpService) {}
}
