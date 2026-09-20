import { Outlet } from "react-router-dom";
import css from "./index.module.scss";
import { useMe } from "../../lib/ctx";
import { createRef } from "react";
import { Navigation } from "../Navigation";
import Logo from "../../assets/images/logo.svg?react";
import { getAvatarUrl } from "@authwithback/shared/src/cloudinary";
import { Icon } from "../Icon";


export const layoutContentElRef = createRef<HTMLDivElement>()

export function Layout() {
  const me = useMe()
  if (!me) {
    return <div>Only authorized!</div>
  }
  return (
    <div className={css.layout}>
      <nav className={css.nav}>
        {/* <h1 style={{border: "1px black solid", borderRadius: 10, padding: 5}}>UserBase</h1> */}
        <Logo className={css.logo}/>
        <div className={css.out}>
          <img className={css.avatar} alt="" src={getAvatarUrl(me.avatar, 'small')} />
          <Icon size={24} className={css.arrowDown} name='arrowDown' />
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
