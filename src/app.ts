import express, { type Express } from 'express'
import dotenv from 'dotenv'
import movieRouter from './movie/movie.router'

dotenv.config()
const app: Express = express()
const port = process.env.PORT
app.use(express.json())

app.use('/api/movies', movieRouter)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
