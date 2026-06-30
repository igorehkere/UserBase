import css from './index.module.scss';
import { Loader } from '../../components/Loader';
import { Helmet } from 'react-helmet-async';
import { useMe } from '../../lib/ctx';
import { getData } from '../../utils/getData';

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
                    <p>{`ФИО - ${me.firstname} ${me.lastname}`}</p>
                    <p>Ник - {me.nick}</p>
                </div>
                <h1>Ваши посты</h1>
                {me.posts.map((post) => {
                  const date = getData(post.createdAt)
                  return (
                    <div className={css.card} key={post.id}>
                        <p>{post.text}</p>
                        <span>{date}</span>
                    </div>
                  );
                })}
            </>
            )}
      </div>
    </>
  );
}