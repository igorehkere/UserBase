import type { TrpcRouterOutput } from '@authwithback/backend/src/router';
import { trpc } from '../../utils/trpc';
import css from './index.module.scss';
import { Icon } from '../Icon';

export const LikeButton = ({ post }: { post: NonNullable<TrpcRouterOutput['getPost']['post']> }) => {
  const trpcUtils = trpc.useContext();
  const setPostLike = trpc.setPostLike.useMutation({
    onMutate: async ({ isLikedByMe, postId }) => {
      const oldPostsData = trpcUtils.getPosts.getData();

      if (oldPostsData) {
        trpcUtils.getPosts.setData(undefined, {
          posts: oldPostsData.posts.map((p) =>
            p.id === postId
              ? {
                  ...p,
                  isLikedByMe,
                  likesCount: p.likesCount + (isLikedByMe ? 1 : -1),
                }
              : p
          ),
        });
      }
      return { oldPostsData };
    },
    onSuccess: () => {
      void trpcUtils.getPosts.invalidate();
    },
  });

  return (
    <button
      className={css.likeButton}
      onClick={(e) => {
        e.preventDefault();
        void setPostLike.mutateAsync({ postId: post.id, isLikedByMe: !post.isLikedByMe });
      }}
    >
      <Icon size={24} className={css.likeIcon} name={post.isLikedByMe ? 'likeFilled' : 'likeEmpty'} />
    </button>
  );
};
