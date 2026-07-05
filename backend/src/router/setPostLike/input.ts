import z from 'zod';

export const zSetPostLikeTrpcInput = z.object({
  postId: z.string().min(1),
  isLikedByMe: z.boolean(),
});
