import { trpc } from '../../utils/trpc';
import css from './index.module.scss';
import { Loader } from '../../components/Loader';
import { Helmet } from 'react-helmet-async';
import { CreatePost } from '../../components/CreatePost';
import { getData } from '../../utils/getData';

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
        ) : (
          <>
            <CreatePost />
            <h1>Посты</h1>
              {data.posts.map((post) => {
                  const date = getData(post.createdAt)
                  return (
                    <div className={css.card} key={post.id}>
                        <p>{post.text}</p>
                        <p>{date}</p>
                    </div>
                  );
                })}
          </>
        )}
      </div>
    </>
  );
}
