import express from 'express';
import { graphsRouter } from './modules/graphs/router/routes';

export const router = express.Router()

router.use('/network', graphsRouter)
