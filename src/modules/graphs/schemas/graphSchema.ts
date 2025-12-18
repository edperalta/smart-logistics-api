import zod from 'zod';

export const graphSchema = zod.object({
    edges: zod.array(
        zod.object({
            from: zod.string(),
            to: zod.string(),
            cost: zod.number().nonnegative(),
        })
    ),
});

export const optimizationSchema = zod.object({
    originNode: zod.string(),
    destinationNode: zod.string(),
});
