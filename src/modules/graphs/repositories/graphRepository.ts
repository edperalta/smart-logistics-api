import { Graph, Prisma, PrismaClient } from '../../../generated/prisma';

const prisma = new PrismaClient()
export class GraphRepository {

    async createGraph(edgeData: {
        edges: Array<Prisma.EdgeCreateInput>;
    }): Promise<Graph | null> {
        const validatedData = Prisma.validator<Prisma.GraphCreateInput>()({
            edges: {
                create: edgeData.edges ?? []
            },
        });
        const result: Graph | null = await this.safeExecute(async () => await prisma.graph.create({
            data: validatedData,
            include: {
                edges: true
            }
        }));

        return result;

    }
    async getAllGraphs(): Promise<Graph[] | null> {
        const resutl = await this.safeExecute(async () => await prisma.graph.findMany())
        return resutl;
    }

    async getGraphById(id: string): Promise<Graph | null> {
        return await this.safeExecute(async () => await prisma.graph.findUnique({
            where: { id },
            include: { edges: true }
        }));

    }

    async safeExecute<T>(operation: () => Promise<T>): Promise<T | null> {
        try {
            return await operation();
        } catch (error) {
            console.error('Database operation failed:', error);
            return null;
        }
    }
}

export const graphRepository = new GraphRepository()
