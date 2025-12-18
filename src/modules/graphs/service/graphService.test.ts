import { graphService } from './graphService';

describe('dijkstraAlgorithm', () => {
    describe('Casos básicos', () => {
        test('debe encontrar el camino más corto en un grafo simple', () => {
            // Grafo: A -> B (costo 10)
            const edges = [
                { from: 'A', to: 'B', cost: 10 }
            ];

            const result = graphService.dijkstraAlgorithm(edges, 'A', 'B');

            expect(result.cost).toBe(10);
            expect(result.path).toEqual(['A', 'B']);
        });

        test('debe encontrar el camino directo cuando existe', () => {
            // Grafo: A -> B (10), B -> C (15), A -> C (20)
            const edges = [
                { from: 'A', to: 'B', cost: 10 },
                { from: 'B', to: 'C', cost: 15 },
                { from: 'A', to: 'C', cost: 20 }
            ];

            const result = graphService.dijkstraAlgorithm(edges, 'A', 'C');

            expect(result.cost).toBe(20);
            expect(result.path).toEqual(['A', 'C']);
        });

        test('debe encontrar el camino más corto a través de nodos intermedios', () => {
            // Grafo: A -> B (10), B -> C (5), A -> C (20)
            // Camino más corto: A -> B -> C (15) en lugar de A -> C (20)
            const edges = [
                { from: 'A', to: 'B', cost: 10 },
                { from: 'B', to: 'C', cost: 5 },
                { from: 'A', to: 'C', cost: 20 }
            ];

            const result = graphService.dijkstraAlgorithm(edges, 'A', 'C');

            expect(result.cost).toBe(15);
            expect(result.path).toEqual(['A', 'B', 'C']);
        });
    });

    describe('Casos complejos', () => {
        test('debe encontrar el camino óptimo en un grafo complejo', () => {
            // Grafo más complejo con múltiples rutas
            const edges = [
                { from: 'A', to: 'B', cost: 4 },
                { from: 'A', to: 'C', cost: 2 },
                { from: 'B', to: 'C', cost: 1 },
                { from: 'B', to: 'D', cost: 5 },
                { from: 'C', to: 'D', cost: 8 },
                { from: 'C', to: 'E', cost: 10 },
                { from: 'D', to: 'E', cost: 2 }
            ];

            const result = graphService.dijkstraAlgorithm(edges, 'A', 'E');

            expect(result.cost).toBe(11);
            expect(result.path).toEqual(['A', 'B', 'D', 'E']);
        });

        test('debe manejar grafos con múltiples nodos intermedios', () => {
            const edges = [
                { from: 'A', to: 'B', cost: 1 },
                { from: 'B', to: 'C', cost: 1 },
                { from: 'C', to: 'D', cost: 1 },
                { from: 'D', to: 'E', cost: 1 }
            ];

            const result = graphService.dijkstraAlgorithm(edges, 'A', 'E');

            expect(result.cost).toBe(4);
            expect(result.path).toEqual(['A', 'B', 'C', 'D', 'E']);
        });
    });
});
