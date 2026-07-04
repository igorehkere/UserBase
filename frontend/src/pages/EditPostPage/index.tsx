import type { TrpcRouterOutput } from '@authwithback/backend/src/router';
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
  getPostForModal: (post: NonNullable<TrpcRouterOutput['getPost']['post']> | null) => void;
  post: NonNullable<TrpcRouterOutput['getPost']['post']>;
};

export const EditPostContent = ({ getPostForModal, post }: editPostType) => {
  const updatePost = trpc.updatePost.useMutation();
  const trpcUtils = trpc.useContext();
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: _.pick(post, ['text']),
    validationSchema: zUpdatePostTrpcInput.omit({
      postId: true,
    }),
    onSubmit: async (values) => {
      await updatePost.mutateAsync({ postId: post.id, ...values });
      trpcUtils.getMe.setData(undefined, (old) => {
            if (!old?.me) return old;

            return {
                ...old,
                me: {
                    ...old.me,
                    posts: old.me.posts.map((p) =>
                        p.id === post.id
                            ? {
                                ...p,
                                text: values.text,
                            }
                            : p
                    ),
                },
            };
        });
      getPostForModal(null);
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
            getPostForModal(null);
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