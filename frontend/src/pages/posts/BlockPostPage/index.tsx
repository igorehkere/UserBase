import type { TrpcRouterOutput } from '@authwithback/backend/src/router';
import { trpc } from '../../../utils/trpc';
import { useForm } from '../../../lib/form';
import { FormItems } from '../../../components/FormItems';
import { Alert } from '../../../components/Alert';
import { Icon } from '../../../components/Icon';
import css from './index.module.scss'

export const BlockPostPage = ({ post }: { post: NonNullable<TrpcRouterOutput['getPost']['post']> }) => {
  const blockPost = trpc.blockPost.useMutation();
  const trpcUtils = trpc.useContext();
  const { formik, buttonProps, alertProps } = useForm({
    onSubmit: async () => {
      await blockPost.mutateAsync({ postId: post.id });
      await trpcUtils.getPosts.refetch();
      await trpcUtils.getMe.refetch();
    },
  });
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      formik.handleSubmit()
    }}>
      <FormItems>
        <Alert {...alertProps} />
        <button className={css.blockButton} {...buttonProps}>
          <Icon className={css.iconBlock} name='blockPost'/>
        </button>
      </FormItems>
    </form>
  );
};
