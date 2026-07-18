import z from "zod";

export const zEditProfileTrpcInput = z.object({
    nick: z.string().min(1),
    firstname: z.string().min(1),
    lastname: z.string().min(1) 
})