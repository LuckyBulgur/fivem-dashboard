import * as z from 'zod';

export const TransferCar = z.object({
    name: z.string(),
    plate: z.string()
});