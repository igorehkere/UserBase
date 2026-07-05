import z from 'zod';

export const zSignInTrpcInput = z.object({
  nick: z
    .string('Введите ник')
    .min(1)
    .regex(/^[a-z0-9-]+$/, 'Nick may contain only lowercase letters, numbers and dashes'),
  password: z.string('Введите пароль').min(1),
});
