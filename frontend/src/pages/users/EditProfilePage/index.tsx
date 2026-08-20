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
import { zUpdatePasswordTrpcInput } from "@authwithback/backend/src/router/users/updatePassword/input"
import z from "zod"


export const EditProfilePage = () => {
    const me = useMe()
    if (!me) {
        return <div>Error</div>
    }
    return (
        <>
            <Helmet>
                <title>UserBase | Изменение профиля</title>
            </Helmet>
            <div className={css.container}>
                <EditProfileComponent me={me} />
                <UpdatePassword />
            </div>
        </>
    )
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
        },
    })

    return (
        <>
        <div>
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

const UpdatePassword = () => {
    const updatePassword = trpc.updatePassword.useMutation()
    const {formik, buttonProps, alertProps} = useForm({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            newPasswordAgain: ''
        },
        validationSchema: zUpdatePasswordTrpcInput.extend({
            newPasswordAgain: z.string('Введите пароль повторно').min(1)
        }).superRefine((val, ctx) => {
            if (val.newPassword !== val.newPasswordAgain) {
                ctx.addIssue({
                    code: 'custom',
                    message: 'Пароли не совпадают',
                    path: ['newPasswordAgain']
                })
            }
        }),
        onSubmit: async ({newPassword, oldPassword}) => {
            await updatePassword.mutateAsync({newPassword, oldPassword})
        },
        successMessage: 'Успешно'
    })

    return (
        <div>
            <div className={css.form}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        formik.handleSubmit();
                    }}
                    
                >
                    <FormItems>
                        <Input name="oldPassword" label="Старый пароль" type="password" formik={formik} />
                        <Input name="newPassword" label="Новый пароль" type="password" formik={formik} />
                        <Input name="newPasswordAgain" label="Новый пароль еще раз" type="password" formik={formik} />
                        <Alert {...alertProps} />
                        <Button {...buttonProps}>Изменить</Button>
                    </FormItems>
                </form>
            </div>
        </div>
    )
}