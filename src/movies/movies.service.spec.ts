import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';
import exp from 'constants';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllMovie', () => {
    it('should return an array', () => {
      const result = service.getAllMovie();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOneMovie', () => {
    it('should return a movie', () => {
      service.createMovie({
        title: 'test movie',
        genres: ['test'],
        year: 2000,
      });
      const movie = service.getOneMovie(1);
      expect(movie).toBeDefined();
    });
    it('should throw 404 error', () => {
      try {
        service.getOneMovie(999);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err.message).toEqual('Movie with Id Not found');
      }
    });
  });

  describe('deleteOneMovie', () => {
    it('delete a movie', () => {
      service.createMovie({
        title: 'test movie',
        genres: ['test'],
        year: 2000,
      });
      const allMovies = service.getAllMovie().length;
      service.deleteOneMovie(1);
      const afterDelete = service.getAllMovie().length;

      expect(afterDelete).toBeLessThan(allMovies);
    });
    it('should return a 404', () => {
      try {
        service.deleteOneMovie(999);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('createMovie', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAllMovie().length;
      service.createMovie({
        title: 'test movie',
        genres: ['test'],
        year: 2000,
      });
      const afterCreate = service.getAllMovie().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });
  describe('updateMovie', () => {
    it('should update a movie', () => {
      service.createMovie({
        title: 'test movie',
        genres: ['test'],
        year: 2000,
      });
      service.updateMovie(1, { title: 'update test' });
      const movie = service.getOneMovie(1);
      expect(movie.title).toEqual('update test');
    });
    it('should return a 404', () => {
      try {
        service.updateMovie(1, {});
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
      }
    });
    it('should throw a NotFoundException', () => {
      try {
        service.updateMovie(999, {});
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
