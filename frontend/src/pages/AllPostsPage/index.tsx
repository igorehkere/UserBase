import { trpc } from '../../utils/trpc';
import css from './index.module.scss';
import { Loader } from '../../components/Loader';
import { Helmet } from 'react-helmet-async';

export function AllPostsPage() {
  const { data, isError, isLoading, error, isFetching } = trpc.getPosts.useQuery();

  return (
    <>
      <Helmet>
        <title>UserBase | Posts</title>
      </Helmet>

      <div className={css.container}>
        {isLoading || isFetching ? (
          <Loader type="page" />
        ) : isError ? (
          <div className={css.error}>Error: {error.message}</div>
        ) : !data.posts.length ? (
          <div>Пока никто не создал пост</div>
        ) : (
          <>
            <h1>Посты</h1>
              {data.posts.map((post) => {
                  return (
                    <div className={css.card} key={post.id}>
                        <p>{post.nick}</p>
                        <p>{post.text}</p>
                        <p>{post.createdAt}</p>
                    </div>
                  );
                })}
          </>
        )}
      </div>
    </>
  );
}
