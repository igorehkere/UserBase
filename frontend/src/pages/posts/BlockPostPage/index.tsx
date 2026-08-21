import type { TrpcRouterOutput } from '@authwithback/backend/src/router';
import { trpc } from '../../../utils/trpc';
import { useForm } from '../../../lib/form';
import { FormItems } from '../../../components/FormItems';
import { Alert } from '../../../components/Alert';
import { Button } from '../../../components/Button';

export const BlockPostPage = ({ post }: { post: NonNullable<TrpcRouterOutput['getPost']['post']> }) => {
  const blockPost = trpc.blockPost.useMutation();
  const trpcUtils = trpc.useContext();
  const { formik, buttonProps, alertProps } = useForm({
    onSubmit: async () => {
      await blockPost.mutateAsync({ postId: post.id });
      await trpcUtils.getPosts.refetch();
    },
  });
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      formik.handleSubmit()
    }}>
      <FormItems>
        <Alert {...alertProps} />
        <Button color="red" {...buttonProps}>
          X
        </Button>
      </FormItems>
    </form>
  );
};
