import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';

@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  @Get()
  getAllMovie(): Movie[] {
    return this.movieService.getAllMovie();
  }

  @Get('search')
  searchMovie(@Query('year') searchYear: string) {
    return `we are searching fr a movie with a title: ${searchYear}`;
  }

  @Post()
  createMovie(@Body() movieData) {
    return this.movieService.createMovie(movieData);
  }

  @Get('/:id')
  getOne(@Param('id') id: string): Movie {
    return this.movieService.getOneMovie(id);
  }

  @Delete('/:id')
  deleteMovie(@Param('id') id: string) {
    return this.movieService.deleteOneMovie(id);
  }

  @Put('/:id')
  updateMovie(@Param('id') id: string, @Body() updateData) {
    return this.movieService.updateMovie(id, updateData);
  }
}
