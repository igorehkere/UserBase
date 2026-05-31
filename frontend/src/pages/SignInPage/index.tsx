import { useState } from 'react';
import { trpc } from '../../utils/trpc';
import { useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { zSignInTrpcInput } from '@authwithback/backend/src/router/SignIn/input';
import { Input } from '../../components/Input';
import { FormItems } from '../../components/FormItems';
import { Button } from '../../components/Button';
import css from './index.module.scss';
import { Alert } from '../../components/Alert';
import { Link, useNavigate } from 'react-router-dom';
import { getAllUsersRoute, getSignUpRoute } from '../../lib/routes';
import Cookies from 'js-cookie';

export function SignInPage() {
  type FormikForm = {
    nick: string;
    password: string;
  };
  const navigate = useNavigate();
  const signIn = trpc.SignIn.useMutation();
  const [submittingError, setSubmittingError] = useState<null | string>(null);
  const trpcUtils = trpc.useContext()

  const formik = useFormik<FormikForm>({
    initialValues: {
      nick: '',
      password: '',
    },
    validationSchema: toFormikValidationSchema(zSignInTrpcInput),
    onSubmit: async (values) => {
      try {
        setSubmittingError(null);
        const { token } = await signIn.mutateAsync(values);
        Cookies.set('token', token, {expires: 99999})
        navigate(getAllUsersRoute())
        void trpcUtils.invalidate()
      } catch (e: any) {
        setSubmittingError(e.message);
      }
    },
  });
  return (
    <div className={css.segmentform}>
      <form
        className={css.form}
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <FormItems>
          <Input label="Ник" name="nick" formik={formik} />
          <Input label="Пароль" name="password" formik={formik} type="password" />
          {!formik.isValid && !!formik.submitCount && <Alert color="red">Неизвестная ошибка</Alert>}
          {!!submittingError && <Alert color="red">{submittingError}</Alert>}
          <div className={css.but}>
            <Link to={getSignUpRoute()}>
              <p>Нет аккаунта</p>
            </Link>
            <Button loading={formik.isSubmitting}>Войти</Button>
          </div>
        </FormItems>
      </form>
    </div>
  );
}
