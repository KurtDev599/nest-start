import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAllMovie(): Movie[] {
    return this.movies;
  }

  getOneMovie(id: string): Movie {
    const movie = this.movies.find((movie) => movie.id === parseInt(id));
    if (!movie) {
      throw new NotFoundException('Movie with Id Not found');
    }
    return movie;
  }

  deleteOneMovie(id: string) {
    this.getOneMovie(id);
    this.movies = this.movies.filter((movie) => movie.id !== parseInt(id));
  }

  createMovie(movieData) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  updateMovie(id: string, movieData) {
    const movie = this.getOneMovie(id);
    this.deleteOneMovie(id);
    this.movies.push({ ...movie, ...movieData });
  }
}
