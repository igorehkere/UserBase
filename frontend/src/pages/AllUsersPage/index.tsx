import { Link } from 'react-router-dom';
import { getViewUserRoute } from '../../lib/routes';
import { trpc } from '../../utils/trpc';
import css from './index.module.scss';
import { Loader } from '../../components/Loader';
import InfiniteScroll from 'react-infinite-scroller';
import { layoutContentElRef } from '../../components/Layout';

export function AllUsersPage() {
  const { data, isError, isLoading, error, hasNextPage, fetchNextPage, isFetchingNextPage, isRefetching } =
    trpc.getUsers.useInfiniteQuery(
      {
        limit: 2,
      },
      {
        getNextPageParam: (lastPage) => {
          return lastPage.nextCursor;
        },
      }
    );

  return (
    <div className={css.container}>
      {isLoading || isRefetching ? (
        <Loader type="page" />
      ) : isError ? (
        <div className={css.error}>Error: {error.message}</div>
      ) : (
        <>
          <h1>Все пользователи</h1>
          <InfiniteScroll
            threshold={250}
            loadMore={() => {
              if (!isFetchingNextPage && hasNextPage) {
                void fetchNextPage();
              }
            }}
            hasMore={hasNextPage}
            loader={<Loader type="page" />}
            useWindow={false}
          >
            {data.pages
              .flatMap((page) => page.users)
              .map((user) => {
                return (
                  <div className={css.card} key={user.id}>
                    <Link to={getViewUserRoute({ userName: user.id })}>
                      <p>nick: {user.nick}</p>
                      <p>Имя: {user.firstname}</p>
                      <p>Фамилия: {user.lastname}</p>
                    </Link>
                  </div>
                );
              })}
          </InfiniteScroll>
        </>
      )}
    </div>
  );
}
