import { Link } from 'react-router-dom';
import { getViewUserRoute } from '../../../lib/routes';
import { trpc } from '../../../utils/trpc';
import css from './index.module.scss';
import { Loader } from '../../../components/Loader';
import InfiniteScroll from 'react-infinite-scroller';
import { Helmet } from 'react-helmet-async';
import { useForm } from '../../../lib/form';
import { zGetUsersTrpcInput } from '@authwithback/backend/src/router/users/getUsers/input';
import { Input } from '../../../components/Input';
import { useDebounceValue } from 'usehooks-ts';

export function AllUsersPage() {
  const { formik } = useForm({
    initialValues: { search: '' },
    validationSchema: zGetUsersTrpcInput.pick({ search: true }),
  });
  const [search] = useDebounceValue(formik.values.search, 500);
  const { data, isError, isLoading, error, hasNextPage, fetchNextPage, isFetchingNextPage, isRefetching } =
    trpc.getUsers.useInfiniteQuery(
      {
        search,
      },
      {
        getNextPageParam: (lastPage) => {
          return lastPage.nextCursor;
        },
      }
    );

  return (
    <>
      <Helmet>
        <title>UserBase</title>
      </Helmet>

      <div className={css.container}>
        <div className={css.filterForm}>
          <Input maxWidth="100%" label="Фильтр" name="search" formik={formik} />
        </div>
        {isLoading || isRefetching ? (
          <Loader type="page" />
        ) : isError ? (
          <div className={css.error}>Error: {error.message}</div>
        ) : !data.pages[0].users.length ? (
          <div>Пользователи отсутсвуют</div>
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
    </>
  );
}
