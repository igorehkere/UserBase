import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import * as routes from './lib/routes';
import './styles/global.scss';
import { UserPage } from './pages/users/UserPage';
import { Layout } from './components/Layout';
import { SignUpPage } from './pages/users/SignUpPage';
import { SignInPage } from './pages/users/SignInPage';
import { SignOutPage } from './pages/users/SignOutPage';
import { useMe } from './lib/ctx';
import { HelmetProvider } from 'react-helmet-async';
import { AllPostsPage } from './pages/posts/AllPostsPage';
import { MyProfilePage } from './pages/users/MyProfilePage';
import { NotFoundPage } from './pages/other/NotFoundPage';
import { EditProfilePage } from './pages/users/EditProfilePage';

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
                <Route path={routes.notFoundRoute()} element={<NotFoundPage />} />
                <Route path={routes.getEditMyProfile()} element={<EditProfilePage />} />
                <Route path="*" element={<Navigate to={routes.notFoundRoute()} replace />} />
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
