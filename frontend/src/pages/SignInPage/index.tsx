import { trpc } from '../../utils/trpc';
import { zSignInTrpcInput } from '@authwithback/backend/src/router/SignIn/input';
import { Input } from '../../components/Input';
import { FormItems } from '../../components/FormItems';
import { Button } from '../../components/Button';
import css from './index.module.scss';
import { Alert } from '../../components/Alert';
import { Link, useNavigate } from 'react-router-dom';
import { getAllUsersRoute, getSignUpRoute } from '../../lib/routes';
import Cookies from 'js-cookie';
import { useForm } from '../../lib/form';
import { Helmet } from 'react-helmet-async';

export function SignInPage() {
  const navigate = useNavigate();
  const signIn = trpc.SignIn.useMutation();
  const trpcUtils = trpc.useContext();

  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      nick: '',
      password: '',
    },
    validationSchema: zSignInTrpcInput,
    onSubmit: async (values) => {
      const { token } = await signIn.mutateAsync(values);
      Cookies.set('token', token, { expires: 1 });
      navigate(getAllUsersRoute());
      void trpcUtils.invalidate();
    },
    resetOnSuccess: false,
    showValidationAlert: true,
  });
  return (
    <>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
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
            <Alert {...alertProps} />
            <div className={css.but}>
              <Link to={getSignUpRoute()}>
                <p>Нет аккаунта</p>
              </Link>
              <Button {...buttonProps}>Войти</Button>
            </div>
          </FormItems>
        </form>
      </div>
    </>
  );
}
