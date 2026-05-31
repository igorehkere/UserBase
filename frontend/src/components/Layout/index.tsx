import { Link, Outlet } from "react-router-dom";
import { getAllUsersRoute, getSignOutRoute } from "../../lib/routes";
import css from "./index.module.scss";

type props = {
  us: {
    id: string,
    nick: string,
    firstname: string
  }
}

export function Layout({us}: props) {
  return (
    <div className={css.layout}>
      <nav className={css.nav}>
        <h1>UserBase</h1>
        <div className={css.btns}>
          <Link to={getAllUsersRoute()}>All Users</Link>
        </div>
        <div className={css.out}>
          <p>Здравствуйте, {us.firstname}</p>
          <Link to={getSignOutRoute()}>Выйти</Link>
        </div>
      </nav>
      <div className={css.content}>
        <Outlet />
      </div>
    </div>
  );
}
