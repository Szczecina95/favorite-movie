import fs from 'fs'
import moviesData from '../db/db.json'
import { CreateMovieDTO } from './dto/create-movie.dto';
import { Genres, MoviesData } from './movie.types'
import path from 'path'
import { getRandomMovieIndex, getLastMovieId } from './movie.helpers';
import { Movie } from './movie.types';

export class MovieService {
    public data: MoviesData
    constructor () {
        this.data = moviesData as MoviesData
    }

    addMovieToDb(movie: CreateMovieDTO): void {
        const { movies } = this.data
        const id = getLastMovieId(movies) === undefined ? 1 : getLastMovieId(movies) + 1;
        const movieToAdd = { id, ...movie }
        movies.push(movieToAdd)

        fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(this.data), (err) => {
        if (err != null) {
            throw err
      }
    })}

    getMovies(): Movie | Movie[] {
        const { movies } = this.data
        const duration = 150
        const genres = null

        const x = this.filterAndSortMoviesByGenres(['Action','Comedy','Drama', 'Sci-Fi'])
        if(duration && !genres){
            return this.getRandomMovieByDuration(duration)
        }

        return movies[getRandomMovieIndex(movies)];
    }

    private filterMoviesByDuration (movies: Movie[], duration: number) {
        const minDuration = duration >= 10 ? duration - 10 : duration
        const maxDuration = duration + 10
        return movies.filter((movie) => Number(movie.runtime) >= minDuration && Number(movie.runtime) <= maxDuration)
    }

    private getRandomMovieByDuration(duration: number) {
        const { movies } = this.data
        const filteredMoviesByRuration = this.filterMoviesByDuration(movies, duration)
        const randomNumberFromFilteredMovies = getRandomMovieIndex(filteredMoviesByRuration)
        return filteredMoviesByRuration[randomNumberFromFilteredMovies]
    }

    private filterAndSortMoviesByGenres(genres: Genres[]) {
        const { movies } = this.data
        const filteredMovies = movies.filter(movie =>
            genres.some(genre => movie.genres.includes(genre))
        );

        const sortedMovies = filteredMovies.sort((a, b) =>
            genres.filter(genre => b.genres.includes(genre)).length -
            genres.filter(genre => a.genres.includes(genre)).length
        );

        return sortedMovies
    }
}

