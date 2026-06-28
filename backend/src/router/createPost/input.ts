import z from 'zod';


export const zCreatePostTrpcInput = z.object({
  text: z.string('Пост не может быть пустым').min(1),
});
