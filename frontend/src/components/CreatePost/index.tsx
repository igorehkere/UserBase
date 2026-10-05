import { useForm } from '../../lib/form';
import { zCreatePostTrpcInput } from '@authwithback/backend/src/router/posts/createPost/input';
import { trpc } from '../../utils/trpc';
import css from './index.module.scss';
import { FormItems } from '../FormItems';
import { TextArea } from '../TextArea';
import { Alert } from '../Alert';
import { Button } from '../Button';
import { UploadsToCloudinary } from '../UploadsToCloudinary';

export const CreatePost = () => {
  const trpcUtils = trpc.useContext();
  const createPost = trpc.createPost.useMutation({
    onSuccess: (newPost) => {
      const previousData = trpcUtils.getMe.getData();

      if (previousData?.me) {
        trpcUtils.getMe.setData(undefined, {
          me: {
            ...previousData.me,
            posts: [{ ...newPost, postLikes: [], isLikedByMe: false, likesCount: 0 }, ...previousData.me.posts],
          },
        });
      }

      trpcUtils.getPosts.invalidate();
    },
  });
  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      text: '',
      images: [],
    },
    validationSchema: zCreatePostTrpcInput,
    onSubmit: async (values) => {
      await createPost.mutateAsync(values);
    },
  });

  return (
    <div className={css.createPostContainer}>
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <TextArea label="" name="text" formik={formik} />
          <div className={css.forms}>
            <Alert {...alertProps} />
            <Button {...buttonProps}>Создать</Button>
            <UploadsToCloudinary label="" name="images" type="image" preset="preview" formik={formik} />
          </div>
        </FormItems>
      </form>
    </div>
  );
};
