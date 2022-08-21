import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAllMovie(): Movie[] {
    return this.movies;
  }

  getOneMovie(id: string): Movie {
    return this.movies.find((movie) => movie.id === parseInt(id));
  }

  deleteOneMovie(id: string): boolean {
    this.movies.filter((movie) => movie.id !== parseInt(id));
    return true;
  }

  createMovie(movieData) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }
}
