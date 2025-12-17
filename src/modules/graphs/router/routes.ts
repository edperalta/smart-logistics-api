import express from 'express'
import { createGraphs, getGraphById, getGraphs } from '../controllers/graphController'
export const graphsRouter = express.Router()

graphsRouter.get('/', getGraphs)
graphsRouter.get('/:id', getGraphById)
graphsRouter.post('/', createGraphs)
