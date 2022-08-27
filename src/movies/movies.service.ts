import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAllMovie(): Movie[] {
    return this.movies;
  }

  getOneMovie(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) {
      throw new NotFoundException('Movie with Id Not found');
    }
    return movie;
  }

  deleteOneMovie(id: number) {
    this.getOneMovie(id);
    this.movies = this.movies.filter((movie) => movie.id !== id);
  }

  createMovie(movieData: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  updateMovie(id: number, movieData: UpdateMovieDto) {
    const movie = this.getOneMovie(id);
    this.deleteOneMovie(id);
    this.movies.push({ ...movie, ...movieData });
  }
}
