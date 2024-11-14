import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Role } from 'src/modules/users/enums/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from '../users/guards/roles.guard';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from '@prisma/client';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { SyncMoviesResponseDto } from './dto/sync-movies-response.dto';
import { Public } from 'src/common/decorators/is-public.decorator';
import { ApiOkCustomResponse } from 'src/common/decorators/api-ok-custom-response.decorator';
import { ApiCreatedCustomResponse } from 'src/common/decorators/api-created-custom-response.decorator';

@ApiTags('Movies')
@Controller({ version: '1', path: 'movies' })
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Public()
  @ApiOperation({ summary: 'Retrieve a list of all movies' })
  @ApiOkCustomResponse({ type: CreateMovieDto, isArray: true })
  @Get()
  async getAllMovie(): Promise<Movie[]> {
    return await this.moviesService.getAllMovies();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retrieve details of a specific movie by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkCustomResponse({ type: CreateMovieDto })
  @Roles(Role.USER)
  @UseGuards(RolesGuard)
  @Get(':id')
  async getMovie(@Param('id') id: number): Promise<Movie> {
    return await this.moviesService.getMovie(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new movie' })
  @ApiCreatedCustomResponse({ type: CreateMovieDto })
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Post()
  async createMovie(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return await this.moviesService.createMovie(createMovieDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an existing movie' })
  @ApiParam({ name: 'id', type: Number })
  @ApiCreatedCustomResponse({ type: CreateMovieDto })
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Put(':id')
  async updateMovie(
    @Param('id') id: number,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Promise<Movie> {
    return await this.moviesService.updateMovie(id, updateMovieDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a movie' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkCustomResponse({ type: CreateMovieDto })
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Delete(':id')
  async deleteMovie(@Param('id') id: number): Promise<Movie> {
    return await this.moviesService.deleteMovie(id);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary:
      'Fetch and synchronize movies from Star Wars API into local database',
  })
  @ApiOkCustomResponse({ type: SyncMoviesResponseDto })
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Post('sync')
  async syncMoviesWithStarWarsApi() {
    return await this.moviesService.syncMoviesWithStarWarsApi();
  }
}
