import { useForm } from "../../lib/form"
import { zCreatePostTrpcInput } from '@authwithback/backend/src/router/CreatePost/input';
import { trpc } from "../../utils/trpc";
import css from './index.module.scss'
import { FormItems } from "../FormItems";
import { TextArea } from "../TextArea";
import { Input } from "../Input";
import { Alert } from "../Alert";
import { Button } from "../Button";

export const CreatePost = () => {

    const createPost = trpc.createPost.useMutation()

    const {formik, alertProps, buttonProps} = useForm({
        initialValues: {
            nick: '',
            name: '',
            text: '',
        },
        validationSchema: zCreatePostTrpcInput,
        onSubmit: async (values) => {
            await createPost.mutateAsync(values)
        }
    })

    return (
        <div className={css.createPostContainer}>
            <form onSubmit={formik.handleSubmit}>
                <FormItems>
                    <Input label='Ник' name='nick' formik={formik} />
                    <Input label='Имя' name='name' formik={formik} />
                    <TextArea label="" name='text' formik={formik} />
                    <Alert {...alertProps} />
                    <Button {...buttonProps}>Создать</Button>
                </FormItems>
            </form>
        </div> 
    )
}