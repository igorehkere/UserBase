import { toFormikValidationSchema } from 'zod-formik-adapter';
import { trpc } from '../../utils/trpc';
import { useFormik } from 'formik';
import { zSignUpTrpcInput } from '@authwithback/backend/src/router/signUp/input';
import z from 'zod';
import { useState } from 'react';
import { Input } from '../../components/Input';
import { FormItems } from '../../components/FormItems';
import { Button } from '../../components/Button';
import { Alert } from '../../components/Alert';
import css from './index.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { getAllUsersRoute, getSignInRoute } from '../../lib/routes';
import Cookies from 'js-cookie';

export function SignUpPage() {
  type FormValues = {
    nick: string;
    firstname: string;
    lastname: string;
    password: string;
    againpassword: string;
  };
  const navigate = useNavigate()
  const signUp = trpc.signUp.useMutation();
  const [submittingError, setSubmittingError] = useState<null | string>(null);
  const trpcUtils = trpc.useContext()

  const formik = useFormik<FormValues>({
    initialValues: {
      nick: '',
      firstname: '',
      lastname: '',
      password: '',
      againpassword: '',
    },
    validationSchema: toFormikValidationSchema(
      zSignUpTrpcInput.extend({ againpassword: z.string('Пожалуйста повторите пароль') }).superRefine((val, ctx) => {
        if (val.password !== val.againpassword) {
          ctx.addIssue({
            code: 'custom',
            message: 'Password must be the same',
            path: ['againpassword'],
          });
        }
      })
    ),
    onSubmit: async (values) => {
      try {
        setSubmittingError(null);
        const {token} = await signUp.mutateAsync(values);
        Cookies.set('token', token, {expires: 99999})
        navigate(getAllUsersRoute())
        trpcUtils.invalidate()
      } catch (e: any) {
        setSubmittingError(e.message);
      }
    },
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
          {!formik.isValid && !!formik.submitCount && <Alert color="red">Неизвестная ошибка</Alert>}
          {!!submittingError && <Alert color="red">{submittingError}</Alert>}
          <div className={css.but}>
            <Link to={getSignInRoute()}><p>Есть аккаунт</p></Link>
            <Button loading={formik.isSubmitting}>Зарегистрироваться</Button>
          </div>
          
        </FormItems>
      </form>
    </div>
  );
}
