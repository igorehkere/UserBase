import z from "zod";

export const zSignUpTrpcInput = z.object({
  nick: z
    .string("Введите ник")
    .min(1)
    .regex(
      /^[a-z0-9-]+$/,
      "Ник может содержать только строчные буквы и цифры",
    ),
  firstname: z.string("Введите имя").min(1),
  lastname: z.string("Введите фамилию").min(1),
  password: z.string("Введите пароль").min(1),
});
