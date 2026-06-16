import { trpc } from '../../utils/trpc';
import { zSignUpTrpcInput } from '@authwithback/backend/src/router/signUp/input';
import z from 'zod';
import { Input } from '../../components/Input';
import { FormItems } from '../../components/FormItems';
import { Button } from '../../components/Button';
import { Alert } from '../../components/Alert';
import css from './index.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { getAllUsersRoute, getSignInRoute } from '../../lib/routes';
import Cookies from 'js-cookie';
import { useForm } from '../../lib/form';

export function SignUpPage() {
  const navigate = useNavigate()
  const signUp = trpc.signUp.useMutation();
  const trpcUtils = trpc.useContext()

  const {formik, alertProps, buttonProps} = useForm({
    initialValues: {
      nick: '',
      firstname: '',
      lastname: '',
      password: '',
      againpassword: '',
    },
    validationSchema: zSignUpTrpcInput.extend({ againpassword: z.string('Пожалуйста повторите пароль') }).superRefine((val, ctx) => {
        if (val.password !== val.againpassword) {
          ctx.addIssue({
            code: 'custom',
            message: 'Password must be the same',
            path: ['againpassword'],
          });
        }
      }),
    onSubmit: async (values) => {
        const {token} = await signUp.mutateAsync(values);
        Cookies.set('token', token, {expires: 1})
        navigate(getAllUsersRoute())
        trpcUtils.invalidate()
    },
    showValidationAlert: true,
    resetOnSuccess: false
  });
  return (
    <div className={css.segmentform}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
        className={css.form}
      >
        <FormItems>
          <Input name="nick" label="Ник" formik={formik} />
          <Input name="firstname" label="Имя" formik={formik} />
          <Input name="lastname" label="Фамилия" formik={formik} />
          <Input name="password" label="Пароль" type="password" formik={formik} />
          <Input name="againpassword" label="Повтор пароля" type="password" formik={formik} />
          <Alert {...alertProps}/>
          <div className={css.but}>
            <Link to={getSignInRoute()}><p>Есть аккаунт</p></Link>
            <Button {...buttonProps}>Зарегистрироваться</Button>
          </div>
          
        </FormItems>
      </form>
    </div>
  );
}
