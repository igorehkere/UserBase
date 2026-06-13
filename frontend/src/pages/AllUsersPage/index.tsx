import { Link } from "react-router-dom";
import { getViewUserRoute } from "../../lib/routes";
import { trpc } from "../../utils/trpc";
import css from "./index.module.scss";
import { Loader } from "../../components/Loader";

export function AllUsersPage() {
  const { data, isError, isLoading, isFetching, error } =
    trpc.getUsers.useQuery();
  if (isLoading || isFetching) {
    return <Loader type='page' />;
  }
  if (isError) {
    return <div className={css.error}>Error: {error.message}</div>;
  }

  return (
    <div className={css.container}>
      <h1>Все пользователи:</h1>
      {data.users.map((user) => {
        return (
          <div className={css.card} key={user.id}>
            <Link to={getViewUserRoute({userName: user.id})}>
              <p>nick: {user.nick}</p>
              <p>Имя: {user.firstname}</p>
              <p>Фамилия: {user.lastname}</p>
            </Link>
            
          </div>
        );
      })}
      {!!(data.users.length === 0) && <div className={css.notfound}>Пользователи не найдены</div>}
    </div>
  );
}
