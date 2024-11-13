import { Role } from 'prisma/role.enum';

export interface ReqUser {
  id: string;
  email: string;
  roles: Role[];
}

export interface Movie {
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
