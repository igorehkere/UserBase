import { trpc } from '../../../utils/trpc';
import css from './index.module.scss';
import { Loader } from '../../../components/Loader';
import { Helmet } from 'react-helmet-async';
import { CreatePost } from '../../../components/CreatePost';
import { getData } from '../../../utils/getData';
import { useMe } from '../../../lib/ctx';
import { LikeButton } from '../../../components/LikeButton';
import InfiniteScroll from 'react-infinite-scroller';
import { BlockPostPage } from '../BlockPostPage';
import { canBlockPosts } from '@authwithback/backend/src/utils/canBlockPosts';
import { getAvatarUrl, getCloudinaryUploadUrl } from '@authwithback/shared/src/cloudinary';
import ImageGallery from 'react-image-gallery';
import { Link } from 'react-router-dom';
import { getViewUserRoute } from '../../../lib/routes';

export function AllPostsPage() {
  const { data, isError, isLoading, error, hasNextPage, fetchNextPage, isFetchingNextPage } =
    trpc.getPosts.useInfiniteQuery(
      {
        limit: 2,
      },
      {
        getNextPageParam: (lastPage) => {
          return lastPage.nextCursor;
        },
      }
    );
  const me = useMe();

  return (
    <>
      <Helmet>
        <title>UserBase | Посты</title>
      </Helmet>

      <div className={css.container}>
        {isLoading ? (
          <Loader type="page" />
        ) : isError ? (
          <div className={css.error}>Error: {error.message}</div>
        ) : (
          <>
            <CreatePost />
            <h1>Посты</h1>
            <InfiniteScroll
              className={css.scroller}
              threshold={250}
              loadMore={() => {
                if (!isFetchingNextPage && hasNextPage) {
                  void fetchNextPage();
                }
              }}
              hasMore={hasNextPage}
              loader={<Loader type="page" />}
              useWindow={true}
            >
              <div className={css.scrollPosts}>
                {data.pages
                  .flatMap((page) => page.posts)
                  .map((post) => {
                    const date = getData(post.createdAt);
                    return (
                      <div className={css.card2} key={post.id}>
                        <div className={css.headerPost}>
                          <div className={css.logoPlusName}>
                            <Link to={getViewUserRoute({ userName: post.authorId })}>
                              <img alt="" className={css.logoPost} src={getAvatarUrl(post.author.avatar, 'small')} />
                            </Link>
                            <Link className={css.name} to={getViewUserRoute({ userName: post.authorId })}>
                              <p >{`${post.author.firstname} ${post.author.lastname}`}</p>
                            </Link>
                          </div>
                          {!!canBlockPosts(me) && <BlockPostPage post={post} />}
                        </div>
                        {!!post.images.length && (
                          <div className={css.gallery}>
                            <ImageGallery
                              showPlayButton={false}
                              showFullscreenButton={false}
                              items={post.images.map((image) => ({
                                original: getCloudinaryUploadUrl(image, 'image', 'large'),
                              }))}
                            />
                          </div>
                        )}
                        <p className={css.text}>{post.text}</p>
                        <div className={css.footerPost}>
                          <div className={css.likes}>
                            <LikeButton post={post} />
                            <p>{post.likesCount}</p>
                          </div>
                          <p>{date}</p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </InfiniteScroll>
          </>
        )}
      </div>
    </>
  );
}
