import css from './index.module.scss';
import { Loader } from '../../components/Loader';
import { Helmet } from 'react-helmet-async';
import { useMe } from '../../lib/ctx';

export function MyProfilePage() {
    const me = useMe()
  return (
    <>
      <Helmet>
        <title>UserBase | Профиль</title>
      </Helmet>

      <div className={css.container}>
            {!me ? <Loader type='page'/> : (
            <>
                <h1>Профиль</h1>
                <div className={css.card}>
                    <p>{me.firstname}</p>
                    <p>{me.lastname}</p>
                    <p>{me.nick}</p>
                </div>
            </>
            )}
      </div>
    </>
  );
}