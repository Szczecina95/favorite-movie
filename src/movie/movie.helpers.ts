import { Genres } from "./movie.types";

export const areGenresValid = (formatedGenres: Genres[], moviesDataGenres: Genres[]) => formatedGenres?.every(genre => moviesDataGenres.includes(genre));
