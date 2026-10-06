import type { TrpcRouterOutput } from '@authwithback/backend/src/router';
import { trpc } from '../../utils/trpc';
import css from './index.module.scss';
import { Icon } from '../Icon';

export const LikeButton = ({ post }: { post: NonNullable<TrpcRouterOutput['getPost']['post']> }) => {
  const trpcUtils = trpc.useContext();
  const setPostLike = trpc.setPostLike.useMutation({
    onMutate: async ({ isLikedByMe, postId }) => {
      const oldPostsData = trpcUtils.getPosts.getInfiniteData({
        limit: 2,
      });

      if (oldPostsData) {
        trpcUtils.getPosts.setInfiniteData({ limit: 2 }, (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              posts: page.posts.map((p) =>
                p.id === postId
                  ? {
                      ...p,
                      isLikedByMe,
                      likesCount: p.likesCount + (isLikedByMe ? 1 : -1),
                    }
                  : p
              ),
            })),
          };
        });
      }

      const oldGetMeData = trpcUtils.getMe.getData();

      if (oldGetMeData) {
        trpcUtils.getMe.setData(undefined, (oldData) => {
          if (!oldData?.me) return oldData;
          return {
            ...oldData,
            me: {
              ...oldData.me,
              posts: oldData.me?.posts.map((post) => {
                return post.id === postId
                  ? {
                      ...post,
                      isLikedByMe,
                      likesCount: post.likesCount + (isLikedByMe ? 1 : -1),
                    }
                  : post;
              }),
            },
          };
        });
      }

      const oldGetUserData = trpcUtils.getUser.getData({
        userName: post.authorId,
      });

      if (oldGetUserData) {
        trpcUtils.getUser.setData({ userName: post.authorId }, (oldData) => {
          if (!oldData?.user) return oldData;

          return {
            ...oldData,
            user: {
              ...oldData.user,
              posts: oldData.user.posts.map((p) =>
                p.id === postId
                  ? {
                      ...p,
                      isLikedByMe,
                      likesCount: p.likesCount + (isLikedByMe ? 1 : -1),
                    }
                  : p
              ),
            },
          };
        });
      }
      return { oldPostsData, oldGetMeData, oldGetUserData };
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
