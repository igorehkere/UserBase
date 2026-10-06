import { useParams } from "react-router-dom";
import { trpc } from "../../../utils/trpc";
import type { ViewUserRouteParams } from "../../../lib/routes";
import css from "./index.module.scss";
import { Loader } from "../../../components/Loader";
import { Helmet } from "react-helmet-async";
import { getAvatarUrl, getCloudinaryUploadUrl } from "@authwithback/shared/src/cloudinary";
import { getData } from "../../../utils/getData";
import ImageGallery from "react-image-gallery";
import { LikeButton } from "../../../components/LikeButton";

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
  const user = data.user
  return (
    <>
    <Helmet>
      <title>{`${user.nick} | UserBase`}</title>
    </Helmet>
    <div className={css.container}>
            <div className={css.newProfile}>
              <div className={css.infoAboutYou}>
                <div>
                  <img alt="" className={css.avatar} src={getAvatarUrl(user.avatar, 'small')} />
                </div>
                <div className={css.card1}>
                  <div className={css.data}>
                    <p className={css.name}>{`${user.firstname} ${user.lastname}`}</p>
                    <p className={css.nick}>@{user.nick}</p>
                  </div>
                </div>
              </div>
              <hr />
              <h1>Ваши посты</h1>
              <div className={css.posts}>
                {user.posts.map((post) => {
                  const date = getData(post.createdAt);
                  if (post.blockedAt) {
                    return null;
                  }
                  return (
                    <div className={css.card2} key={post.id}>
                      <div className={css.headerPost}>
                        <div className={css.logoPlusName}>
                          <img alt="" className={css.logoPost} src={getAvatarUrl(user.avatar, 'small')} />
                          <p>{`${user.firstname} ${user.lastname}`}</p>
                        </div>
                      </div>
                      {!!post.images.length && (
                          <div className={css.gallery}>
                            <ImageGallery
                              showPlayButton={false}
                              showFullscreenButton={false}
                              items={post.images.map((image) => ({
                                original: getCloudinaryUploadUrl(image, 'image', 'large'),
                              }))}
                            />
                          </div>
                        )}
                      <p className={css.text}>{post.text}</p>
                      <div className={css.footerPost}>
                        <div className={css.likes}>
                          <LikeButton post={post} />
                          <p>{post.likesCount}</p>
                        </div>
                        <p>{date}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
      </div>
    </>
  );
}
