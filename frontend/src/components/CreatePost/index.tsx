import { useForm } from "../../lib/form"
import { zCreatePostTrpcInput } from '@authwithback/backend/src/router/posts/CreatePost/input';
import { trpc } from "../../utils/trpc";
import css from './index.module.scss'
import { FormItems } from "../FormItems";
import { TextArea } from "../TextArea";
import { Alert } from "../Alert";
import { Button } from "../Button";

export const CreatePost = () => {
    const trpcUtils = trpc.useContext()
    const createPost = trpc.createPost.useMutation({
        onSuccess: (newPost) => {

            const previousData = trpcUtils.getMe.getData();
            
            if (previousData?.me) {
                trpcUtils.getMe.setData(undefined, {
                    me: {
                        ...previousData.me,
                        posts: [newPost, ...previousData.me.posts]
                    }
                });
            }
            
            trpcUtils.getPosts.invalidate();
        }
    });
    const {formik, alertProps, buttonProps} = useForm({
        initialValues: {
            text: '',
        },
        validationSchema: zCreatePostTrpcInput,
        onSubmit: async (values) => {
            await createPost.mutateAsync(values);
            
        }
    })

    return (
        <div className={css.createPostContainer}>
            <form onSubmit={formik.handleSubmit}>
                <FormItems>
                    <TextArea label="" name='text' formik={formik} />
                    <Alert {...alertProps} />
                    <Button {...buttonProps}>Создать</Button>
                </FormItems>
            </form>
        </div> 
    )
}