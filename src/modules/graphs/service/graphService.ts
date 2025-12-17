import { graphRepository } from "../repositories/graphRepository";

export const graphService = {
    getGraphs: async () => {
        const graphs = await graphRepository.getAllGraphs();
        return graphs;
    },

    getGraphById: async (id: string) => {
        return await graphRepository.getGraphById(id);

    },

    createGraphs: async (graphs: any) => {
        const createdGraphs = await graphRepository.createGraph(graphs);
        if (!createdGraphs) return null;
        return createdGraphs;
    }
}
