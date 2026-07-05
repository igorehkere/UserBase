import { useParams } from "react-router-dom";
import { trpc } from "../../../utils/trpc";
import type { ViewUserRouteParams } from "../../../lib/routes";
import css from "./index.module.scss";
import { Loader } from "../../../components/Loader";
import { Helmet } from "react-helmet-async";

export function UserPage() {
  const { userName } = useParams() as ViewUserRouteParams;
  const { data, isError, isLoading, isFetching, error } = trpc.getUser.useQuery(
    { userName },
  );
  if (isLoading || isFetching) {
    return <Loader type="page" />;
  }
  if (isError) {
    return <div className={css.error}>Error: {error.message}</div>;
  }
  if (!data.user) {
    return <div className={css.notfound}>User is not find</div>;
  }
  return (
    <>
    <Helmet>
      <title>{`${data.user.nick} | UserBase`}</title>
    </Helmet>
    <div className={css.container}>
        <div className={css.card}>
            <p>Id: {data.user.id}</p>
            <p>Имя: {data.user.firstname}</p>
            <p>Фамилия: {data.user.lastname}</p>
            <p>NickName: {data.user.nick}</p>
        </div>
    </div>
    </>
  );
}
