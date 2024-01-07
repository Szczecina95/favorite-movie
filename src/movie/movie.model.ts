import { Genres } from "./movie.types"

export class Movie {
    constructor (movie: Movie) {
      this.id = movie.id
      this.title = movie.title
      this.year = movie.year
      this.runtime = movie.runtime
      this.genres = movie.genres
      this.director = movie.director
      this.actors = movie.actors
      this.plot = movie.plot
      this.posterUrl = movie.posterUrl
    }
  
    id: number
    title: string
    year: string
    runtime: string
    genres: Genres[]
    director: string
    actors: string
    plot: string
    posterUrl: string
  }