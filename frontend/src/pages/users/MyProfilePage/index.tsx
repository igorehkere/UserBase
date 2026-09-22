import css from './index.module.scss';
import { Loader } from '../../../components/Loader';
import { Helmet } from 'react-helmet-async';
import { useMe } from '../../../lib/ctx';
import { getData } from '../../../utils/getData';
import { ButtonChange } from '../../../components/Button';
import { useState } from 'react';
import { EditPostContent } from '../../posts/EditPostPage';
import { AnimatePresence } from 'framer-motion';
import { HiOutlinePencil } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { getEditMyProfile } from '../../../lib/routes';
import { getAvatarUrl } from '@authwithback/shared/src/cloudinary';

export function MyProfilePage() {
  const me = useMe();
  const [showModalWindow, setShowModalWindow] = useState<null | NonNullable<ReturnType<typeof useMe>>['posts'][number]>(
    null
  );

  function getPostForModal(post: NonNullable<ReturnType<typeof useMe>>['posts'][number] | null) {
    setShowModalWindow(post);
  }

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
            <AnimatePresence>
              {showModalWindow ? <EditPostContent getPostForModal={getPostForModal} post={showModalWindow} /> : null}
            </AnimatePresence>
            <div className={css.newProfile}>
              <div className={css.infoAboutYou}>
                <div>
                  <img alt="" className={css.avatar} src={getAvatarUrl(me.avatar, 'small')} />
                </div>
                <Link to={getEditMyProfile()} className={css.pencilWr}>
                  <HiOutlinePencil className={css.pencil} />
                </Link>
                <div className={css.card1}>
                  <div className={css.data}>
                    <p className={css.name}>{`${me.firstname} ${me.lastname}`}</p>
                    <p className={css.nick}>@{me.nick}</p>
                  </div>
                </div>
              </div>
              <hr />
              <h1>Ваши посты</h1>
              <div>
                {me.posts.map((post) => {
                  const date = getData(post.createdAt);
                  if (post.blockedAt) {
                    return null;
                  }
                  return (
                    <div className={css.card2} key={post.id}>
                      <p>{post.text}</p>
                      <div className={css.panel}>
                        <ButtonChange
                          onClick={() => {
                            getPostForModal(post);
                          }}
                        >
                          Изменить
                        </ButtonChange>
                        <span>{date}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
