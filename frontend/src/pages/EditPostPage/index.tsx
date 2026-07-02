import type { TrpcRouterOutput } from '@authwithback/backend/src/router'
import { Loader } from '../../components/Loader'
import { useMe } from '../../lib/ctx'
import { useForm } from '../../lib/form'
import { trpc } from '../../utils/trpc'
import css from './index.module.scss'
import { zUpdatePostTrpcInput } from '@authwithback/backend/src/router/updatePost/input'
import _ from 'lodash'
import { FormItems } from '../../components/FormItems'
import { TextArea } from '../../components/TextArea'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'

type editPostType = {
    getPostId: (postId: string | null) => void,
    post: NonNullable<TrpcRouterOutput['getPost']['post']>
}

const EditPostComponent = ({getPostId, post}: editPostType) => {

    const updatePost = trpc.updatePost.useMutation()
    const {formik, buttonProps, alertProps} = useForm({
        initialValues: _.pick(post, ['text']),
        validationSchema: zUpdatePostTrpcInput.omit({
            postId: true
        }),
        onSubmit: async (values) => {
            await updatePost.mutateAsync({postId: post.id, ...values})
            // сделать бесшовную инвалидацию!!!
        }
    })


    return (
        <div className={css.container}>
            <div className={css.panel}>
                <div className={css.close} onClick={() => {
                    getPostId(null)
                }}>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <FormItems>
                        <TextArea name='text' label='' formik={formik}/>
                        <Alert {...alertProps}/>
                        <Button {...buttonProps}>Изменить</Button>
                    </FormItems>
                </form>
            </div>
        </div>
    )
}

export const EditPostPage = ({postId, getPostId}: {postId: string, getPostId: (postId: string | null) => void}) => {
    const getPostResult = trpc.getPost.useQuery({
        id: postId
    })

    const me = useMe()

    if (!me) {
        return <div>Only authorize</div>
    }
    if (getPostResult.isLoading) {
        return <Loader type="page"/>
    }
    if (getPostResult.isError) {
        return <div>Error: {getPostResult.error.message}</div>
    }
    if (!getPostResult.data.post) {
        return <div>Not found</div>
    }

    const post = getPostResult.data.post

    if (me.id !== post.authorId) {
        return <div>An idea can only be edited by the author</div>
    }
    return <EditPostComponent getPostId={getPostId} post={post}/>
}