import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Smart Logistics API',
            version: '1.0.0',
            description: 'API para gestión de redes logísticas y optimización de rutas',
            contact: {
                name: 'API Support',
                url: 'https://github.com/edperalta/smart-logistics-api',
            },
        },
        components: {
            schemas: {
                Edge: {
                    type: 'object',
                    required: ['from', 'to', 'cost'],
                    properties: {
                        from: {
                            type: 'string',
                            description: 'Nodo origen',
                            example: 'A',
                        },
                        to: {
                            type: 'string',
                            description: 'Nodo destino',
                            example: 'B',
                        },
                        cost: {
                            type: 'number',
                            minimum: 0,
                            description: 'Costo o distancia de la arista',
                            example: 10,
                        },
                    },
                },
                Graph: {
                    type: 'object',
                    required: ['id', 'edges', 'createdAt', 'updatedAt'],
                    properties: {
                        id: {
                            type: 'string',
                            format: 'uuid',
                            description: 'ID único del grafo',
                        },
                        edges: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: {
                                        type: 'string',
                                        format: 'uuid',
                                    },
                                    from: {
                                        type: 'string',
                                    },
                                    to: {
                                        type: 'string',
                                    },
                                    cost: {
                                        type: 'integer',
                                    },
                                },
                            },
                            description: 'Lista de aristas del grafo',
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Fecha de creación',
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Fecha de última actualización',
                        },
                    },
                },
                CreateGraphRequest: {
                    type: 'object',
                    required: ['edges'],
                    properties: {
                        edges: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/Edge',
                            },
                            description: 'Lista de aristas para crear el grafo',
                        },
                    },
                },
                OptimizeGraphRequest: {
                    type: 'object',
                    required: ['originNode', 'destinationNode'],
                    properties: {
                        originNode: {
                            type: 'string',
                            description: 'Nodo de origen para la optimización',
                            example: 'A',
                        },
                        destinationNode: {
                            type: 'string',
                            description: 'Nodo de destino para la optimización',
                            example: 'D',
                        },
                    },
                },
                OptimizeGraphResponse: {
                    type: 'object',
                    properties: {
                        path: {
                            type: 'array',
                            items: {
                                type: 'string',
                            },
                            description: 'Camino óptimo encontrado',
                            example: ['A', 'B', 'C', 'D'],
                        },
                        totalCost: {
                            type: 'number',
                            description: 'Costo total del camino óptimo',
                            example: 25,
                        },
                    },
                },
                Error: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            description: 'Mensaje de error',
                        },
                        errors: {
                            type: 'array',
                            items: {
                                type: 'object',
                            },
                            description: 'Detalles de los errores (opcional)',
                        },
                    },
                },
            },
        },
    },
    apis: ['./src/modules/*/router/*.ts', './src/router.ts'], // Rutas a los archivos con anotaciones JSDoc
};

export const swaggerSpec = swaggerJsdoc(options);
export { swaggerUi };
