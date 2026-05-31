import { AllUsersPage } from './pages/AllUsersPage';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import * as routes from './lib/routes';
import './styles/global.scss';
import { UserPage } from './pages/UserPage';
import { Layout } from './components/Layout';
import { SignUpPage } from './pages/SignUpPage';
import { SignInPage } from './pages/SignInPage';
import { trpc } from './utils/trpc';
import { SignOutPage } from './pages/SignOutPage';

export function App() {
  const { data, isError, isFetching, isLoading } = trpc.getMe.useQuery();
  return (
      <BrowserRouter>
        <Routes>
          {isLoading || isFetching || isError ? null : data.me ? (
            <>
            <Route path={routes.getSignOutRoute()} element={<SignOutPage/>}/>
            <Route element={<Layout us={data.me}/>}>
              <Route path={routes.getAllUsersRoute()} element={<AllUsersPage />} />
              <Route path={routes.getViewUserRoute(routes.viewUserRouteParams)} element={<UserPage />} />
              <Route path="*" element={<Navigate to={routes.getAllUsersRoute()} replace />} />
            </Route>
            </>
          ) : (
            <>
              <Route path={routes.getSignInRoute()} element={<SignInPage />} />
              <Route path={routes.getSignUpRoute()} element={<SignUpPage />} />
              <Route path="*" element={<Navigate to={routes.getSignInRoute()} replace />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
  );
}
