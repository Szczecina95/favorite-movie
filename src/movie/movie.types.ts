export interface Movie { 
    id: number
    title: string
    year: string
    runtime: string
    genres: Genres[]
    director?: string
    actors?: string
    plot?: string
    posterUrl?: string
}

export interface MoviesData {
    genres: Genres[]
    movies: Movie[]
}  

export type Genres = "Action" | "Comedy" | "Drama" | "Horror" | "Sci-Fi" | 'Romance' | 'Animation' | 'Biography' | 'Crime' |  'Adventure' | 'Fantasy' | 'Musical';