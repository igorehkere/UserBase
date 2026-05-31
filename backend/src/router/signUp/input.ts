import z from "zod";

export const zSignUpTrpcInput = z.object({
  nick: z
    .string("Nick is required")
    .min(1)
    .regex(
      /^[a-z0-9-]+$/,
      "Nick may contain only lowercase letters, numbers and dashes",
    ),
  firstname: z.string("FirstName is required").min(1),
  lastname: z.string("LastName is required").min(1),
  password: z.string("Password is required").min(1),
});
