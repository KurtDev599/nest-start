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
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from "./dto/update-movie.dto";

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
  createMovie(@Body() movieData: CreateMovieDto) {
    return this.movieService.createMovie(movieData);
  }

  @Get('/:id')
  getOne(@Param('id') id: number): Movie {
    return this.movieService.getOneMovie(id);
  }

  @Delete('/:id')
  deleteMovie(@Param('id') id: number) {
    return this.movieService.deleteOneMovie(id);
  }

  @Put('/:id')
  updateMovie(@Param('id') id: number, @Body() updateData: UpdateMovieDto) {
    return this.movieService.updateMovie(id, updateData);
  }
}
