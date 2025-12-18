import express from 'express'
import { createGraphs, getGraphById, getGraphs, nodesPerGraph, optimizeGraph } from '../controllers/graphController'
export const graphsRouter = express.Router()

/**
 * @swagger
 * /network:
 *   get:
 *     summary: Get all graphs
 *     description: Returns a list of all graphs registered in the system
 *     tags:
 *       - Graphs
 *     responses:
 *       200:
 *         description: List of graphs obtained successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Graph'
 *       404:
 *         description: No graphs found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
graphsRouter.get('/', getGraphs)

/**
 * @swagger
 * /network/{id}:
 *   get:
 *     summary: Get graph by ID
 *     description: Returns detailed information of a specific graph
 *     tags:
 *       - Graphs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Unique ID of the graph
 *     responses:
 *       200:
 *         description: Graph found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Graph'
 *       404:
 *         description: Graph not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
graphsRouter.get('/:id', getGraphById)

/**
 * @swagger
 * /network/nodes/{id}:
 *   get:
 *     summary: Get nodes from a graph
 *     description: Returns the list of all unique nodes that are part of a graph
 *     tags:
 *       - Graphs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Unique ID of the graph
 *     responses:
 *       200:
 *         description: List of nodes obtained successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *               example: ["A", "B", "C", "D"]
 *       404:
 *         description: Graph not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
graphsRouter.get('/nodes/:id', nodesPerGraph)

/**
 * @swagger
 * /network/route/optimize/{id}:
 *   post:
 *     summary: Optimize route in a graph
 *     description: Calculates the shortest path between two nodes in the graph using Dijkstra's algorithm
 *     tags:
 *       - Graphs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Unique ID of the graph
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OptimizeGraphRequest'
 *     responses:
 *       200:
 *         description: Optimized route calculated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OptimizeGraphResponse'
 *       400:
 *         description: Invalid optimization data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Graph not found or optimization failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
graphsRouter.post('/route/optimize/:id', optimizeGraph)

/**
 * @swagger
 * /network/upload:
 *   post:
 *     summary: Create a new graph
 *     description: Creates a new graph with the specified edges
 *     tags:
 *       - Graphs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateGraphRequest'
 *           example:
 *             edges:
 *               - from: "A"
 *                 to: "B"
 *                 cost: 10
 *               - from: "B"
 *                 to: "C"
 *                 cost: 15
 *               - from: "A"
 *                 to: "C"
 *                 cost: 20
 *     responses:
 *       201:
 *         description: Graph created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Graph'
 *       400:
 *         description: Invalid graph data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
graphsRouter.post('/upload', createGraphs)

