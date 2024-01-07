import { Router } from "express"
import { MovieController } from './movie.controller'

const router = Router()
const movieController = new MovieController();

router.get('/', movieController.getMovies)
router.post('/', movieController.addMovie)

export default router