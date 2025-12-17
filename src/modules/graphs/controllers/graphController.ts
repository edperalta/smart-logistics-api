
import { Request, Response } from 'express';
import { graphService } from '../service/graphService';

export async function getGraphs(req: Request, res: Response) {
    // Implement controller logic here
    const grpahs = await graphService.getGraphs();
    if (grpahs === null) return res.status(404).json({ message: 'Graphs not found' });
    return res.json(grpahs);
}

export async function getGraphById(req: Request, res: Response) {
    const graphId = req.params.id;
    const graph = await graphService.getGraphById(graphId);
    if (!graph || graph === null) return res.status(404).json({ message: 'Graph not found' });
    return res.json(graph);
}

export async function createGraphs(req: Request, res: Response) {
    const graphs = req.body;
    const createdGraphs = await graphService.createGraphs(graphs);
    if (!createdGraphs) return res.status(400).json({ message: 'Failed to create graphs' });
    return res.status(201).json(createdGraphs);
}
