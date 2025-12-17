import express, { NextFunction, Request, Response } from 'express'
import { router } from './router'

const app = express()
app.use(express.json())


app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: 'Welcome to the API V 2.2.2!' })
    next()
})
app.use('/', router)
// app.use(errorHandler)

export default app
