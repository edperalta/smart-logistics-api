
import { Request, Response } from 'express';
import { graphSchema, optimizationSchema } from '../schemas/graphSchema';
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
    const graphs = graphSchema.safeParse(req.body);
    if (!graphs.success) {
        return res.status(400).json({ message: 'Invalid graph data', errors: graphs.error.errors });
    }
    const createdGraphs = await graphService.createGraphs(graphs.data);
    if (!createdGraphs) return res.status(400).json({ message: 'Failed to create graphs' });
    return res.status(201).json(createdGraphs);
}

export async function nodesPerGraph(req: Request, res: Response) {
    const graphId = req.params.id;
    const nodes = await graphService.getNodesPerGraph(graphId);
    if (!nodes || nodes === null) return res.status(404).json({ message: 'Graph not found' });


    return res.json(Array.from(nodes));
}

export async function optimizeGraph(req: Request, res: Response) {
    const graphId = req.params.id;
    const data = optimizationSchema.safeParse(req.body);
    if (!data.success) {
        return res.status(400).json({ message: 'Invalid optimization data', errors: data.error.errors });
    }
    const result = await graphService.optimizeGraph({
        id: graphId,
        ...data.data
    });
    if (!result) return res.status(404).json({ message: 'Graph not found or optimization failed' });
    return res.json(result);
}
