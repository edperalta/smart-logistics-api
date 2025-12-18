import { GraphInterface, graphRepository } from "../repositories/graphRepository";


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
    },

    getNodesPerGraph: async (id: string) => {
        const graph: GraphInterface | null = await graphRepository.getGraphById(id);
        if (!graph) return null;

        const nodes = new Set<string>();
        graph.edges.forEach(edge => {
            nodes.add(edge.from);
            nodes.add(edge.to);
        });

        return nodes;
    },

    optimizeGraph: async ({ id, originNode, destinationNode }: {
        id: string;
        originNode: string;
        destinationNode: string;
    }) => {
        const graph = await graphRepository.getGraphById(id);
        if (!graph) return null;

        const result = graphService.dijkstraAlgorithm(graph.edges, originNode, destinationNode);
        return {
            id,
            ...result
        };

    },

    dijkstraAlgorithm: (edges, originNode, destinationNode): { cost: number; path: string[] } => {
        const distances = {};
        const previous = {};
        const visited = new Set();

        edges.forEach(edge => {
            distances[edge.from] = Infinity;
            distances[edge.to] = Infinity;
            previous[edge.from] = null;
            previous[edge.to] = null;
        });


        distances[originNode] = 0;

        // Función auxiliar: nodo no visitado con menor distancia
        function getClosestNode() {
            let closest: string | null = null;
            let minDistance = Infinity;

            for (const node in distances) {
                if (!visited.has(node) && distances[node] < minDistance) {
                    minDistance = distances[node];
                    closest = node;
                }
            }

            return closest;
        }

        // Loop principal
        let currentNode = getClosestNode();

        while (currentNode !== null) {
            if (currentNode === destinationNode) break;

            visited.add(currentNode);

            // buscar vecinos
            edges
                .filter(edge => edge.from === currentNode)
                .forEach(edge => {
                    const newDistance = distances[currentNode!] + edge.cost;

                    if (newDistance < distances[edge.to]) {
                        distances[edge.to] = newDistance;
                        previous[edge.to] = currentNode;
                    }
                });

            currentNode = getClosestNode();
        }

        // Reconstruir camino
        const path: string[] = [];
        let node = destinationNode;

        while (node) {
            path.unshift(node);
            node = previous[node];
        }

        return {
            cost: distances[destinationNode],
            path
        };
    }
}
