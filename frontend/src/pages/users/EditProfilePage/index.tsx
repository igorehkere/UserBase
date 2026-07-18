import type { TrpcRouterOutput } from "@authwithback/backend/src/router"
import { useMe } from "../../../lib/ctx"
import { trpc } from "../../../utils/trpc"
import { useForm } from "../../../lib/form"
import { zEditProfileTrpcInput } from "@authwithback/backend/src/router/users/editProfile/input"
import { useNavigate } from "react-router-dom"
import { getMyProfileRoute } from "../../../lib/routes"
import css from './index.module.scss'
import { Helmet } from "react-helmet-async"
import { FormItems } from "../../../components/FormItems"
import { Input } from "../../../components/Input"
import { Alert } from "../../../components/Alert"
import { Button } from "../../../components/Button"


export const EditProfilePage = () => {
    const me = useMe()
    if (!me) {
        return <div>Error</div>
    }
    return <EditProfileComponent me={me}/>
}

const EditProfileComponent = ({me}: {me: NonNullable<TrpcRouterOutput['getMe']['me']>}) => {

    const trpcUtils = trpc.useContext()
    const navigate = useNavigate()
    const updateProfile = trpc.editProfile.useMutation()
    const {formik, buttonProps, alertProps} = useForm({
        initialValues: {
            nick: me.nick,
            firstname: me.firstname,
            lastname: me.lastname
        },
        validationSchema: zEditProfileTrpcInput,
        onSubmit: async (values) => {
            await updateProfile.mutateAsync(values)
            trpcUtils.getMe.invalidate()
            navigate(getMyProfileRoute())
        }
    })

    return (
        <>
        <Helmet>
            <title>Изменение профиля</title>
        </Helmet>
        <div className={css.container}>
            <div className={css.form}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        formik.handleSubmit();
                    }}
                    
                >
                    <FormItems>
                        <Input name="nick" label="Ник" formik={formik} />
                        <Input name="firstname" label="Имя" formik={formik} />
                        <Input name="lastname" label="Фамилия" formik={formik} />
                        <Alert {...alertProps} />
                        <Button {...buttonProps}>Изменить</Button>
                    </FormItems>
                </form>
            </div>
            
        </div>
        </>
    )
}