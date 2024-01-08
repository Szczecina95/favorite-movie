import { MovieService } from '../movie.service';
import { Genres, Movie } from '../movie.types';

describe('MovieService', () => {
  let movieService: MovieService;

  beforeEach(() => {
    movieService = new MovieService();
  });

  it('should add a movie to the database', () => {
    const initialMoviesCount = movieService.data.movies.length;
    const movieToAdd = {
      title: 'Test Movie',
      year: '2022',
      runtime: '120',
      genres: ['Action'],
      director: 'Test Director',
    } as Movie;

    movieService.addMovieToDb(movieToAdd);

    const updatedMoviesCount = movieService.data.movies.length;
    expect(updatedMoviesCount).toBe(initialMoviesCount + 1);

    const addedMovie = movieService.data.movies.find((movie) => movie.title === 'Test Movie');
    expect(addedMovie).toBeDefined();
  });

  it('should get a random movie if no genres and duration are specified', () => {
    const result = movieService.getMovies(undefined, undefined);
    expect(movieService.data.movies).toContain(result);
  });

  it('should get a random movie by duration if only duration is specified', () => {
    const duration = 120;
    const result = movieService.getMovies(undefined, duration) as Movie;

    expect(parseInt(result.runtime)).toBeGreaterThanOrEqual(duration - 10);
    expect(parseInt(result.runtime)).toBeLessThanOrEqual(duration + 10);
  });

  it('should filter movies by genres and duration if both genres and duration are specified', () => {
    const genres = 'Action';
    const duration = 120;
    const result = movieService.getMovies(genres, duration) as Movie[];
    const filteredGenres = genres.trim().split(',')

    expect(result[0].genres).toContain(filteredGenres[0]);
    expect(parseInt(result[0].runtime)).toBeGreaterThanOrEqual(duration - 10);
    expect(parseInt(result[0].runtime)).toBeLessThanOrEqual(duration + 10);
  });
});