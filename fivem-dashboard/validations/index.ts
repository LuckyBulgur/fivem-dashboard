import * as z from 'zod';

export const TransferCar = z.object({
    name: z.string().min(1),
    plate: z.string().min(1)
});