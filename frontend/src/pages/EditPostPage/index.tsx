import type { TrpcRouterOutput } from '@authwithback/backend/src/router';
import { useMe } from '../../lib/ctx';
import { useForm } from '../../lib/form';
import { trpc } from '../../utils/trpc';
import css from './index.module.scss';
import { zUpdatePostTrpcInput } from '@authwithback/backend/src/router/updatePost/input';
import _ from 'lodash';
import { FormItems } from '../../components/FormItems';
import { TextArea } from '../../components/TextArea';
import { Alert } from '../../components/Alert';
import { Button } from '../../components/Button';
import { motion } from 'framer-motion';
import { createPortal } from "react-dom";

type editPostType = {
  getPostId: (postId: string | null) => void;
  post: NonNullable<TrpcRouterOutput['getPost']['post']>;
};

const EditPostComponent = ({ getPostId, post }: editPostType) => {
  const updatePost = trpc.updatePost.useMutation();
  const trpcUtils = trpc.useContext();
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: _.pick(post, ['text']),
    validationSchema: zUpdatePostTrpcInput.omit({
      postId: true,
    }),
    onSubmit: async (values) => {
      await updatePost.mutateAsync({ postId: post.id, ...values });
      trpcUtils.getMe.invalidate()
      getPostId(null);
    },
  });

  return createPortal(
    <motion.div className={css.container} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div
        className={css.panel}
        initial={{ y: -120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -120, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className={css.close}
          onClick={() => {
            getPostId(null);
          }}
        ></div>
        <form onSubmit={formik.handleSubmit} className={css.forma}>
          <FormItems>
            <TextArea name="text" label="" formik={formik} />
            <Alert {...alertProps} />
            <Button {...buttonProps}>Изменить</Button>
          </FormItems>
        </form>
      </motion.div>
    </motion.div>, document.body
  );
};

export const EditPostPage = ({ postId, getPostId }: { postId: string; getPostId: (postId: string | null) => void }) => {
  const getPostResult = trpc.getPost.useQuery({
    id: postId,
  });

  const me = useMe();

  if (!me) {
    return <div>Only authorize</div>;
  }
  if (getPostResult.isLoading) {
    return null
  }
  if (getPostResult.isError) {
    return <div>Error: {getPostResult.error.message}</div>;
  }
  if (!getPostResult.data.post) {
    return <div>Not found</div>;
  }

  const post = getPostResult.data.post;

  if (me.id !== post.authorId) {
    return <div>An idea can only be edited by the author</div>;
  }
  return <EditPostComponent getPostId={getPostId} post={post} />;
};

