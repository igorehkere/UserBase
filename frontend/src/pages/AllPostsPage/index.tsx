import { trpc } from '../../utils/trpc';
import css from './index.module.scss';
import { Loader } from '../../components/Loader';
import { Helmet } from 'react-helmet-async';
import { CreatePost } from '../../components/CreatePost';
import { getData } from '../../utils/getData';
import { useMe } from '../../lib/ctx';
import { LikeButton } from '../../components/LikeButton';

export function AllPostsPage() {
  const { data, isError, isLoading, error } = trpc.getPosts.useQuery();
  const me = useMe()
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
              {data.posts.map((post) => {
                  const date = getData(post.createdAt)
                  return (
                    <div className={css.card} key={post.id}>
                        <span>{`${post.author.firstname} ${post.author.lastname}`}</span>
                        <p>{post.text}</p>
                        <div className={css.panelInfo}>
                          {me && (
                            <LikeButton post={post}/>
                          )}
                          <p>{post.likesCount}</p>
                          <span>{date}</span>
                        </div>  
                    </div>
                  );
                })}
          </>
        )}
      </div>
    </>
  );
}
