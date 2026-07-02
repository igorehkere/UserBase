import z from "zod";


export const zGetPostTrpcInput = z.object({
    id: z.string().min(1),
})