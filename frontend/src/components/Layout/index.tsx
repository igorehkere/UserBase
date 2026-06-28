import { Link, Outlet } from "react-router-dom";
import { getSignOutRoute } from "../../lib/routes";
import css from "./index.module.scss";
import { useMe } from "../../lib/ctx";
import { createRef } from "react";
import { Navigation } from "../Navigation";


export const layoutContentElRef = createRef<HTMLDivElement>()

export function Layout() {
  const me = useMe()
  if (!me) {
    return <div>Only authorized!</div>
  }
  return (
    <div className={css.layout}>
      <nav className={css.nav}>
        <h1>UserBase</h1>
        <div className={css.out}>
          <p>Здравствуйте, {me.firstname}</p>
          <Link to={getSignOutRoute()}>Выйти</Link>
        </div>
      </nav>
      <div className={css.navi}>
        <Navigation/>
      </div>
      <div className={css.content} ref={layoutContentElRef}>
        <Outlet />
      </div>
    </div>
  );
}
