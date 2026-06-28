import { useForm } from "../../lib/form"
import { zCreatePostTrpcInput } from '@authwithback/backend/src/router/CreatePost/input';
import { trpc } from "../../utils/trpc";
import css from './index.module.scss'
import { FormItems } from "../FormItems";
import { TextArea } from "../TextArea";
import { Alert } from "../Alert";
import { Button } from "../Button";

export const CreatePost = () => {

    const createPost = trpc.createPost.useMutation()
    const trpcUtils = trpc.useContext()
    const {formik, alertProps, buttonProps} = useForm({
        initialValues: {
            text: '',
        },
        validationSchema: zCreatePostTrpcInput,
        onSubmit: async (values) => {
            await createPost.mutateAsync(values)
            trpcUtils.getPosts.invalidate()
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