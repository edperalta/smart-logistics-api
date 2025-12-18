import express, { NextFunction, Request, Response } from 'express'
import { swaggerSpec, swaggerUi } from './config/swagger'
import { router } from './router'

const app = express()
app.use(express.json())

// Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json({
        message: 'Welcome to the API V 2.2.2!',
        documentation: '/docs'
    })
    next()
})
app.use('/', router)
// app.use(errorHandler)

export default app
