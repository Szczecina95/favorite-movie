import { validate } from "class-validator";
import { CreateMovieDTO } from "./dto/create-movie.dto";
import { MovieService } from "./movie.service";
import { Request, Response } from 'express';

const movieService = new MovieService();

export class MovieController {     
    async addMovie(req: Request, res: Response): Promise<void> {
        try {
            const movie: CreateMovieDTO = new CreateMovieDTO()
            movie.actors = req.body.actors
            movie.genres = req.body.genres
            movie.plot = req.body.plot
            movie.runtime = req.body.runtime
            movie.year = req.body.year
            movie.director = req.body.director
            movie.posterUrl = req.body.posterUrl
            movie.title = req.body.title

            const errors = await validate(movie);

            if (errors.length) {
                res.send(errors)
            }

            movieService.addMovieToDb(movie);
            res.status(201).json({ message: 'Movie added successfully' });
        } catch (error) {
            console.error('Error adding movie:', error);
            res.status(400).json({ error: 'Bad request' });
        }
    }

    getMovies(req: Request, res: Response) {
        const genres: string = <string>req.query.genres
        const duration: number = parseInt(<string>req.query.duration, 10)
        const movies = movieService.getMovies(genres, duration);
        res.status(200).send(movies)
    }
}
