import { trpc } from "../../utils/trpc";
import css from "./index.module.scss";

export function AllUsersPage() {
  const { data, isError, isLoading, isFetching, error } =
    trpc.getUsers.useQuery();
  if (isLoading || isFetching) {
    return <div className={css.loading}>Loading...</div>;
  }
  if (isError) {
    return <div className={css.error}>Error: {error.message}</div>;
  }
  return (
    <div className={css.container}>
      <h1>All Users:</h1>
      {data.users.map((user) => {
        return (
          <div className={css.card} key={user.id}>
            <p>nick: {user.nick}</p>
            <p>Name: {user.name}</p>
          </div>
        );
      })}
    </div>
  );
}
