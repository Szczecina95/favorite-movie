import fs from 'fs'
import moviesData from '../db/db.json'
import { CreateMovieDTO } from './dto/create-movie.dto';
import { Genres, MoviesData } from './movie.types'
import path from 'path'
import { Movie } from './movie.types';

export class MovieService {
    public data: MoviesData
    constructor () {
        this.data = moviesData as MoviesData
    }

    addMovieToDb(movie: CreateMovieDTO): void {
        const { movies } = this.data
        const id = this.getLastMovieId(movies) === undefined ? 1 : this.getLastMovieId(movies) + 1;
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

        if(duration && !genres){
            return this.getRandomMovieByDuration(duration)
        }
        if(!duration && genres){ 
            return this.filterAndSortMoviesByGenres(genres)
        }

        return movies[this.getRandomMovieIndex(movies)];
    }

    private filterMoviesByDuration (movies: Movie[], duration: number): Movie[] {
        const minDuration = duration >= 10 ? duration - 10 : duration
        const maxDuration = duration + 10
        return movies.filter((movie) => Number(movie.runtime) >= minDuration && Number(movie.runtime) <= maxDuration)
    }

    private getRandomMovieByDuration(duration: number): Movie {
        const { movies } = this.data
        const filteredMoviesByRuration = this.filterMoviesByDuration(movies, duration)
        const randomNumberFromFilteredMovies = this.getRandomMovieIndex(filteredMoviesByRuration)
        return filteredMoviesByRuration[randomNumberFromFilteredMovies]
    }

    private filterAndSortMoviesByGenres(genres: Genres[]): Movie[] {
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

    private getLastMovieId(movies: Movie[]): number {
        return movies[movies.length - 1].id;
    }
    
    private getRandomMovieIndex (movies: Movie[]): number {
        return Math.floor(Math.random() * (movies.length - 1)) + 1
    }
}

