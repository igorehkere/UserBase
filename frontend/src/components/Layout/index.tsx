import { Outlet } from 'react-router-dom';
import css from './index.module.scss';
import { useMe } from '../../lib/ctx';
import { createRef, useState } from 'react';
import { Navigation } from '../Navigation';
import Logo from '../../assets/images/logo.svg?react';
import { getAvatarUrl } from '@authwithback/shared/src/cloudinary';
import { Icon } from '../Icon';
import { UpperInfoWindow } from '../UpperInfoWindow';
import type { TrpcRouterOutput } from '@authwithback/backend/src/router';

export const layoutContentElRef = createRef<HTMLDivElement>();

export function Layout() {
  const me = useMe();
  const [showUpperWindow, setShowUpperWindow] = useState<null | NonNullable<TrpcRouterOutput>['getMe']['me']>(null);
  const handleShowUpperWindow = (me: NonNullable<TrpcRouterOutput>['getMe']['me']) => {
    if (!showUpperWindow) {
      setShowUpperWindow(me);
    } else {
      setShowUpperWindow(null);
    }
  };
  if (!me) {
    return <div>Only authorized!</div>;
  }
  return (
    <div className={css.layout}>
      <nav className={css.nav}>
        {/* <h1 style={{border: "1px black solid", borderRadius: 10, padding: 5}}>UserBase</h1> */}
        <Logo className={css.logo} />
        <ButtonOpenWindow
          onClick={() => {
            handleShowUpperWindow(me);
          }}
        >
          <div className={css.out}>
            <img className={css.avatar} alt="" src={getAvatarUrl(me.avatar, 'small')} />
            {showUpperWindow ? <Icon size={24} className={css.arrowDown} name="arrowUp" /> : <Icon size={24} className={css.arrowDown} name="arrowDown" />}
          </div>
        </ButtonOpenWindow>
        {!!showUpperWindow && <UpperInfoWindow me={me} />}
      </nav>
      <div className={css.navi}>
        <Navigation />
      </div>
      <div className={css.content} ref={layoutContentElRef}>
        <Outlet />
      </div>
    </div>
  );
}

const ButtonOpenWindow = ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => {
  return (
    <button onClick={onClick} className={css.buttonWindow}>
      <span className={css.text}>{children}</span>
    </button>
  );
};
