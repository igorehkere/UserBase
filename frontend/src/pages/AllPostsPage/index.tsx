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
                        <span>{`${post.author.firstname} ${post.author.lastname}`}</span>
                        <p>{post.text}</p>
                        <span>{date}</span>
                    </div>
                  );
                })}
          </>
        )}
      </div>
    </>
  );
}
