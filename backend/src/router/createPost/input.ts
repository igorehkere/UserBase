import z from 'zod';


export const zCreatePostTrpcInput = z.object({
  nick: z.string('Пожалуйста, введите ник поста').min(1),
  name: z.string('Введите имя поста').min(1),
  text: z.string('Пост не может быть пустым').min(1),
});
