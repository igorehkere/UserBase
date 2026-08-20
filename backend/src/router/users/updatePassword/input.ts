import z from 'zod';

export const zUpdatePasswordTrpcInput = z.object({
  oldPassword: z.string('Для изменения пароля, нужно ввести старый.').min(1),
  newPassword: z.string('Введите новый пароль'),
});
