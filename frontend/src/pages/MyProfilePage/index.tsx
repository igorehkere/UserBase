import css from './index.module.scss';
import { Loader } from '../../components/Loader';
import { Helmet } from 'react-helmet-async';
import { useMe } from '../../lib/ctx';
import { getData } from '../../utils/getData';
import { ButtonChange } from '../../components/Button';
import { useState } from 'react';
import { EditPostPage } from '../EditPostPage';

export function MyProfilePage() {
  const me = useMe();
  const [showModalWindow, setShowModalWindow] = useState<null | string>(null);

  function getPostId(postId: string | null) {
    setShowModalWindow(postId);
  }
  console.log(showModalWindow)
  return (
    <>
      <Helmet>
        <title>UserBase | Профиль</title>
      </Helmet>

      <div className={css.container}>
        {!me ? (
          <Loader type="page" />
        ) : (
          <>
            {showModalWindow ? <EditPostPage postId={showModalWindow} getPostId={getPostId}/> : null}
            <h1>Профиль</h1>
            <div className={css.card}>
              <p>{`ФИО - ${me.firstname} ${me.lastname}`}</p>
              <p>Ник - {me.nick}</p>
            </div>
            <h1>Ваши посты</h1>
            {me.posts.map((post) => {
              const date = getData(post.createdAt);
              return (
                <div className={css.card} key={post.id}>
                  <p>{post.text}</p>
                  <div className={css.panel}>
                    <ButtonChange onClick={() => {
                      getPostId(post.id)
                    }}>Изменить</ButtonChange>
                    <span>{date}</span>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
}
