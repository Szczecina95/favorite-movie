import fs from 'fs'
import moviesData from '../db/db.json'
import { CreateMovieDTO } from './dto/create-movie.dto';
import { Genres, MoviesData } from './movie.types'
import path from 'path'
import { Movie } from './movie.types';

export class MovieService {
    public data: MoviesData
    constructor () {
        this.data = <MoviesData>moviesData
    }

    addMovieToDb(movie: CreateMovieDTO): void {
        const { movies } = this.data;
        const id = this.getLastMovieId(movies) === undefined ? 1 : this.getLastMovieId(movies) + 1;
        const movieToAdd = { id, ...movie };
        movies.push(movieToAdd);
      
        try {
          fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(this.data));
        } catch (err) {
          console.error('Error during saving object to database', err);
          throw err; 
        }
      }

    getMovies(genres?: Genres[], duration?: number): Movie | Movie[] {
        const { movies } = this.data
    
        if(duration && !genres){
            return this.getRandomMovieByDuration(duration)
        }
        if(!duration && genres){ 
            return this.filterAndSortMoviesByGenres(genres)
        }

        if (duration && genres) {
            return this.filterMoviesByGenresAndDuration(genres, duration);
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
        const { movies } = this.data;
    
        const sortedMovies = movies
            .filter(movie => genres.some(genre => movie.genres.includes(genre)))
            .sort((a, b) => {
                const matchingGenresA = genres.filter(genre => a.genres.includes(genre)).length;
                const matchingGenresB = genres.filter(genre => b.genres.includes(genre)).length;
    
                if (matchingGenresB !== matchingGenresA) {
                    return matchingGenresB - matchingGenresA;
                } else {
                    return a.title.localeCompare(b.title);
                }
            });
    
        return sortedMovies;
    }

    private filterMoviesByGenresAndDuration(genres: Genres[], duration: number): Movie[] {
        const { movies } = this.data;
    
        const filteredMoviesByGenres = this.filterAndSortMoviesByGenres(genres);
        const filteredMoviesByDuration = this.filterMoviesByDuration(movies, duration);
    
        return filteredMoviesByGenres.filter(movie => filteredMoviesByDuration.includes(movie));
    }

    private getLastMovieId(movies: Movie[]): number {
        return movies[movies.length - 1].id;
    }
    
    private getRandomMovieIndex (movies: Movie[]): number {
        return Math.floor(Math.random() * (movies.length - 1)) + 1
    }
}

