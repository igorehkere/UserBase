import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import * as routes from './lib/routes';
import './styles/global.scss';
import { UserPage } from './pages/UserPage';
import { Layout } from './components/Layout';
import { SignUpPage } from './pages/SignUpPage';
import { SignInPage } from './pages/SignInPage';
import { SignOutPage } from './pages/SignOutPage';
import { useMe } from './lib/ctx';
import { HelmetProvider } from 'react-helmet-async';
import { AllPostsPage } from './pages/AllPostsPage';
import { MyProfilePage } from './pages/MyProfilePage';

export function App() {
  const me = useMe();
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          {me ? (
            <>
              <Route path={routes.getSignOutRoute()} element={<SignOutPage />} />
              <Route element={<Layout />}>
                <Route path={routes.getAllPostsRoute()} element={<AllPostsPage />} />
                <Route path={routes.getViewUserRoute(routes.viewUserRouteParams)} element={<UserPage />} />
                <Route path={routes.getMyProfileRoute()} element={<MyProfilePage />} />
                <Route path="*" element={<Navigate to={routes.getAllPostsRoute()} replace />} />
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
    </HelmetProvider>
  );
}
