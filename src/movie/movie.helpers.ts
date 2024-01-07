import { Movie } from "./movie.types"

export const getLastMovieId = (movies: Movie[]) =>{
    return movies[movies.length - 1].id;
}

export const generateRandomMovieNumber = (movies: Movie[]): number => {
    return Math.floor(Math.random() * (movies.length - 1)) + 1
}

