export interface Movie { 
    id: number
    title: string
    year: string
    runtime: string
    genres: Genres[]
    director: string
    actors?: string
    plot?: string
    posterUrl?: string
}

export interface MoviesData {
    genres: Genres[]
    movies: Movie[]
}  

export type Genres = 
  "Comedy" |
  "Fantasy" |
  "Crime" |
  "Drama" |
  "Music" |
  "Adventure" |
  "History" |
  "Thriller" |
  "Animation" |
  "Family" |
  "Mystery" |
  "Biography" |
  "Action" |
  "Film-Noir" |
  "Romance" |
  "Sci-Fi" |
  "War" |
  "Western" |
  "Horror" |
  "Musical" |
  "Sport";