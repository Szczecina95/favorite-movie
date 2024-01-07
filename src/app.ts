import express, { type Express } from 'express'
import dotenv from 'dotenv'

dotenv.config()
const app: Express = express()
const port = process.env.PORT

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});